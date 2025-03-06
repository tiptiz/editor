import prompts from "prompts"
import $ from "shelljs"
import { loadEnv } from "vite"

import selectPackages, { r } from "./utils/package-info.mjs"
import updateAndPublishPackages from "./utils/package-publish.mjs"
import { collectVersionInfo, PackageUpdate } from "./utils/package-version.mjs"

const authToken = loadEnv("npm", r(), "NPM").NPM_PUBLISH_TOKEN

/**
 * Format package updates for display
 * @param packagesToUpdate Array of package updates
 * @returns Formatted string with package update information
 */
const formatPackageUpdates = (packagesToUpdate: PackageUpdate[]): string => {
    return packagesToUpdate.map(update => {
        const { package: pkg, versionType, newVersion } = update
        return `  - ${pkg.name}: ${pkg.version} → ${newVersion} (${versionType})`
    }).join("\n")
}

async function main() {
    console.log("🔍 Scanning for packages...\n")

    const selectedPackages = await selectPackages()

    console.log(`\n📦 Selected ${selectedPackages.length} packages for update\n`)

    const packagesToUpdate = await collectVersionInfo(selectedPackages)

    if (packagesToUpdate.length === 0) {
        console.log("No packages to update. Exiting.")
        process.exit(0)
    }

    // Confirm before proceeding
    const { confirmed } = await prompts({
        type: "confirm",
        name: "confirmed",
        message: "Proceed with updates?",
        initial: true
    })

    if (!confirmed) {
        console.log("Update cancelled.")
        process.exit(0)
    }

    console.log("\n📋 Summary of updates to be applied:")
    console.log(formatPackageUpdates(packagesToUpdate))

    if (authToken) {
        $.exec(`npm set //registry.npmjs.org/:_authToken=${authToken}`)
    } else {
        console.log("No auth token found. Exiting.")
        process.exit(0)
    }

    console.log("\n🚀 Starting update and publish process...\n")
    await updateAndPublishPackages(packagesToUpdate)
    console.log("\n✅ All packages processed successfully!")
}

main()
    .catch(err => {
        console.error("\n❌ Error:", err)
        process.exit(1)
    })
    .finally(() => {
        $.exec("npm config delete //registry.npmjs.org/:_authToken")
        console.log("\n🔑 Auth token removed.")
    })
