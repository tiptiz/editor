// 1. select workspaceApps
// 2. select packages to run dev command
// 3. build selected packages concurrently
// 4. link selected packages to global
// 5. link selected packages to tiptiz-editor if needed
// 6. link selected packages to workspaceApps
// 7. run dev command concurrently (each selected package)
// 8. run dev command concurrently (each selected workspaceApp)

// all dev command need keep running until user stop

import concurrently from "concurrently"
import prompts from "prompts"
import $ from "shelljs"

import { cliSelectPackages, getPackages, Package, workspaceApps } from "./utils/package-info.mjs"
import { r } from "./utils/paths.mjs"
import { createFilteredOutputStream } from "./utils/terminal-display.mjs"

// Create filtered output stream for cleaner logs
const filteredOutput = createFilteredOutputStream()

// Helper function to ensure tiptiz-editor is included and properly linked
async function ensureTiptizEditor(selectedPackages: Package[]): Promise<Package[]> {
    // If no packages selected, return empty array
    if (selectedPackages.length === 0) return []

    // Check if any package is selected except tiptiz-editor
    const hasPublicPackages = selectedPackages.some(pkg => !pkg.name.includes("@tiptiz/editor"))
    if (!hasPublicPackages) return selectedPackages

    // Check if tiptiz-editor is already selected
    const hasTiptizEditor = selectedPackages.some(pkg => pkg.name.includes("@tiptiz/editor"))

    if (!hasTiptizEditor) {
        // Get all packages to find tiptiz-editor
        const allPackages = await getPackages()
        const tiptizEditor = allPackages.find(pkg => pkg.name.includes("@tiptiz/editor"))

        if (tiptizEditor) {
            console.log("Automatically including @tiptiz/editor as it's required by selected packages")
            return [...selectedPackages, tiptizEditor]
        }
    }

    return selectedPackages
}

// Function to link packages to tiptiz-editor
async function linkPackagesToTiptizEditor(selectedPackages: Package[]) {
    const packagesToLink = selectedPackages.filter(pkg => !pkg.name.includes("@tiptiz/editor"))
    if (packagesToLink.length === 0) return

    const tiptizEditor = selectedPackages.find(pkg => pkg.name.includes("@tiptiz/editor"))
    if (!tiptizEditor) return

    console.log("Linking selected packages to @tiptiz/editor...")

    $.cd(tiptizEditor.path)
    for (const pkg of packagesToLink) {
        console.log(`Linking ${pkg.name} to @tiptiz/editor...`)
        $.exec(`pnpm link ${pkg.name}`)
    }
    $.cd(r())
}

// 1. Select workspaceApps
async function selectWorkspaceApps() {
    console.log("Selecting workspace apps to run in dev mode...")

    const choices = workspaceApps.map(app => ({
        title: app,
        value: app
    }))

    const response = await prompts({
        type: "multiselect",
        name: "value",
        message: "Select workspace apps to run in dev mode:",
        choices,
        hint: "- Space to select. Enter to submit"
    })

    if (!response.value || response.value.length === 0) {
        console.log("No workspace apps selected.")
        return []
    }

    return response.value as string[]
}

// 2. Select packages to run dev command
async function selectPackagesToDev() {
    console.log("Selecting packages to run in dev mode...")
    return await cliSelectPackages(await getPackages())
}

// 3. Build selected packages
async function buildSelectedPackages(selectedPackages: Package[]) {
    console.log("Building selected packages...")

    const buildTasks = selectedPackages.map(pkg => ({
        name: pkg.name,
        command: `pnpm --filter ${pkg.name} build`
    }))

    if (buildTasks.length === 0) {
        console.log("No packages to build")
        return
    }

    await concurrently(buildTasks, {
        prefix: "build",
        prefixColors: "green",
        outputStream: filteredOutput
    }).result
}

// 4. Link selected packages to global
async function linkPackagesToGlobal(selectedPackages: Package[]) {
    console.log("Linking selected packages to global...")

    for (const pkg of selectedPackages) {
        console.log(`Linking ${pkg.name}...`)
        $.cd(pkg.path)
        $.exec("pnpm link --global")
        $.cd(r())
    }
}

// 5. Link selected packages to workspaceApps
async function linkPackagesToApps(selectedPackages: Package[], selectedApps: string[]) {
    if (selectedApps.length === 0 || selectedPackages.length === 0) {
        return
    }

    console.log("Linking selected packages to workspace apps...")

    for (const app of selectedApps) {
        const appPath = r(app)
        $.cd(appPath)

        for (const pkg of selectedPackages) {
            console.log(`Linking ${pkg.name} to ${app}...`)
            $.exec(`pnpm link ${pkg.name}`)
        }

        $.cd(r())
    }
}

// 6. Run dev command concurrently for each selected package
async function runDevForPackages(selectedPackages: Package[]) {
    console.log("Starting dev mode for selected packages...")

    const devTasks = selectedPackages.map(pkg => ({
        name: pkg.name,
        command: `pnpm --filter ${pkg.name} dev`
    }))

    if (devTasks.length === 0) {
        console.log("No packages to run in dev mode")
        return
    }

    // Return the concurrently instance but don't await it
    // so it keeps running in the background
    return concurrently(devTasks, {
        prefix: "dev",
        prefixColors: "blue",
        killOthers: ["failure"]
    })
}

// 7. Run dev command concurrently for each selected workspaceApp
async function runDevForApps(selectedApps: string[]) {
    if (selectedApps.length === 0) {
        return
    }

    console.log("Starting dev mode for selected workspace apps...")

    const devTasks = selectedApps.map(app => ({
        name: app,
        command: `pnpm --filter ./${app} dev`
    }))

    // Return the concurrently instance but don't await it
    // so it keeps running in the background
    return concurrently(devTasks, {
        prefix: "app",
        prefixColors: "magenta",
        killOthers: ["failure"]
    })
}

// Main function to orchestrate the dev process
async function main() {
    try {
        // 1. Select workspaceApps
        const selectedApps = await selectWorkspaceApps()

        if (selectedApps.length === 0) {
            console.log("No workspace apps selected. Exiting.")
            process.exit(0)
        }

        // 2. Select packages to run dev command
        let selectedPackages = await selectPackagesToDev()

        // Ensure tiptiz-editor is included if needed
        selectedPackages = await ensureTiptizEditor(selectedPackages)
        let packagesDevProcess: any = null

        if (selectedPackages.length > 0) {
            // 3. Build selected packages
            await buildSelectedPackages(selectedPackages)

            // 4. Link selected packages to global
            await linkPackagesToGlobal(selectedPackages)

            // 5. Link selected packages to tiptiz-editor if needed
            await linkPackagesToTiptizEditor(selectedPackages)

            // 6. Link selected packages to workspaceApps
            await linkPackagesToApps(selectedPackages, selectedApps)

            // 7. Run dev command for selected packages
            packagesDevProcess = await runDevForPackages(selectedPackages)
        }

        // 8. Run dev command for selected workspaceApps
        const appsDevProcess = await runDevForApps(selectedApps)

        // Keep the script running until user interrupts
        console.log("\nDev processes are running. Press Ctrl+C to stop all processes.\n")

        // Handle process termination
        process.on("SIGINT", () => {
            console.log("\nStopping all dev processes...")
            if (packagesDevProcess) {
                packagesDevProcess.commands.forEach(cmd => cmd.kill())
            }
            if (appsDevProcess) {
                appsDevProcess.commands.forEach(cmd => cmd.kill())
            }
            process.exit(0)
        })
    } catch (error) {
        console.error("Error in dev script:", error)
        process.exit(1)
    }
}

main()
