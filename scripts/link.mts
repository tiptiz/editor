import fs from "node:fs"
import path from "node:path"

import concurrently, { type ConcurrentlyCommandInput } from "concurrently"

import { getPackages, Package, publicPackages, workspaceApps } from "./utils/package-info.mjs"
import { createFilteredOutputStream } from "./utils/terminal-display.mjs"

type Dependencies = Record<string, string>
type CommandInfo = ConcurrentlyCommandInput & { name: string }

/**
 * Run commands concurrently with filtered output
 */
const runCommands = async (commands: CommandInfo[], options: { maxProcesses?: number } = {}) => {
    if (commands.length === 0) return false

    try {
        await concurrently(commands, {
            prefix: "name",
            killOthers: ["failure"],
            outputStream: createFilteredOutputStream(),
            ...options
        }).result

        await new Promise(resolve => setTimeout(resolve, 1000))
        return true
    } catch (error) {
        console.error("❌ Some commands failed:", error)
        return false
    }
}

async function linkPackagesToGlobal(packages: Package[]) {
    console.log("\n📦 Step 1: Linking packages to global...")

    const commands = packages.map(pkg => ({
        command: "pnpm link --global",
        name: `${pkg.name} -> global`,
        cwd: pkg.path,
        prefixColor: "yellow"
    }))

    const success = await runCommands(commands)
    if (success) {
        console.log("✅ All packages linked to global successfully")
    }
}

async function linkDependenciesBetweenPackages(packages: Package[]) {
    console.log("\n📦 Step 2: Linking dependencies between packages...")

    const commands: CommandInfo[] = []

    for (const pkg of packages) {
        try {
            const packageJsonPath = path.join(pkg.path, "package.json")
            if (!fs.existsSync(packageJsonPath)) {
                console.log(`   Skipping ${pkg.name}: No package.json found`)
                continue
            }

            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
            const allDependencies: Dependencies = {
                ...(packageJson.dependencies || {}),
                ...(packageJson.devDependencies || {}),
                ...(packageJson.peerDependencies || {})
            }

            const dependenciesToLink = packages.filter(depPkg => !!allDependencies[depPkg.name])

            if (dependenciesToLink.length === 0) {
                console.log(`   No internal dependencies found for ${pkg.name}`)
                continue
            }

            console.log(`   Found ${dependenciesToLink.length} dependencies for ${pkg.name}`)

            for (const depPkg of dependenciesToLink) {
                commands.push({
                    command: `pnpm link --global ${depPkg.name}`,
                    name: `${pkg.name} <- ${depPkg.name}`,
                    cwd: pkg.path,
                    prefixColor: "green"
                })
            }
        } catch (error) {
            console.error(`❌ Failed to process dependencies for ${pkg.name}:`, error)
        }
    }

    if (commands.length === 0) {
        console.log("   No dependencies to link")
        return
    }

    const success = await runCommands(commands, { maxProcesses: 5 })
    if (success) {
        console.log("✅ All dependencies linked successfully")
    }
}

async function linkPackages() {
    console.log("🔗 Linking tiptiz-extension packages...")

    try {
        // Get public packages
        const libs = await getPackages(publicPackages)
        if (libs.length === 0) {
            console.log("❌ No tiptiz-extension packages found!")
            process.exit(1)
        }
        console.log(`📦 Found ${libs.length} packages to link:`)
        libs.forEach(pkg => console.log(`   - ${pkg.name} (v${pkg.version})`))

        // Link public packages to global
        await linkPackagesToGlobal(libs)

        // Link dependencies between all packages
        const allPkgs = libs.concat(await getPackages(workspaceApps))
        console.log(`📦 Total packages for dependency linking: ${allPkgs.length}`)
        await linkDependenciesBetweenPackages(allPkgs)

        console.log("\n✅ All packages linked successfully!")
    } catch (error) {
        console.error("❌ Failed to link packages:", error)
        process.exit(1)
    }
}

// Run the link function
linkPackages().catch(error => {
    console.error("❌ An error occurred:", error)
    process.exit(1)
})
