import fs from "node:fs"
import path from "node:path"

import PackageJson from "@npmcli/package-json"
import prompts from "prompts"

import { r } from "./paths.mjs"

// Define package type
export interface Package {
    name: string
    path: string
    version: string
}

/**
 * Get all tiptiz-extension packages with their current versions
 * @returns Promise<Package[]> Array of package information
 */
export const getPackages = async (): Promise<Package[]> => {
    const packagesDir = r("packages")
    const packageDirs = fs.readdirSync(packagesDir)
        .filter(dir => dir.startsWith("tiptiz-extension-"))

    const packages: Package[] = []

    for (const dir of packageDirs) {
        const pkgPath = path.join(packagesDir, dir)
        try {
            const pkgJson = await PackageJson.load(pkgPath)
            const version = pkgJson.content.version as string
            packages.push({
                name: dir,
                path: pkgPath,
                version
            })
        } catch (error) {
            console.error(`Error loading package.json for ${dir}:`, error)
        }
    }

    return packages
}

/**
 * Prompt user to select packages to update
 * @param packages List of available packages
 * @returns Promise<Package[]> Selected packages
 */
export const cliSelectPackages = async (packages: Package[]): Promise<Package[]> => {
    if (packages.length === 0) {
        console.error("No tiptiz-extension packages found!")
        process.exit(1)
    }

    // Create package choices for selection with version info
    const packageChoices = packages.map(pkg => ({
        title: `${pkg.name} (v${pkg.version})`,
        value: pkg
    }))

    // Prompt for package selection with multi-select
    const packageResponse = await prompts({
        type: "multiselect",
        name: "value",
        message: "Select packages to publish (use space to select, enter to confirm):",
        choices: packageChoices,
        hint: "- Space to select. Enter to submit"
    })

    if (!packageResponse.value || packageResponse.value.length === 0) {
        console.log("No packages selected. Exiting.")
        process.exit(0)
    }

    return packageResponse.value as Package[]
}

export default async function selectPackages() {
    return cliSelectPackages(await getPackages())
}
