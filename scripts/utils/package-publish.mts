import PackageJson from "@npmcli/package-json"
import $ from "shelljs"

import { PackageUpdate } from "./package-version.mjs"

// Get auth token for npm publishing
/**
 * Update and publish packages
 * @param packagesToUpdate Array of package updates to process
 * @returns Promise<void>
 */
const updateAndPublishPackages = async (packagesToUpdate: PackageUpdate[]): Promise<void> => {
    for (const update of packagesToUpdate) {
        try {
            const pkg = update.package
            const currentVersion = pkg.version
            const newVersion = update.newVersion!
            const versionType = update.versionType

            // Read package.json
            const pkgJson = await PackageJson.load(pkg.path)

            // Update package.json
            pkgJson.update({ version: newVersion })
            await pkgJson.save()

            console.log(`Updated ${pkg.name} from ${currentVersion} to ${newVersion}`)

            // Build the package
            console.log(`Building ${pkg.name}...`)
            $.cd(pkg.path)
            if ($.exec("npm run build").code !== 0) {
                console.error(`Failed to build ${pkg.name}`)
                continue
            }

            console.log(`Publishing ${pkg.name}@${newVersion}...`)
            if ($.exec(`npm publish --access public${versionType.includes("pre") ? " --tag next" : ""}`).code !== 0) {
                console.error(`Failed to publish ${pkg.name}`)
            }
        } catch (error) {
            console.error(`Error processing ${update.package.name}:`, error)
        }
    }
}

export default updateAndPublishPackages
