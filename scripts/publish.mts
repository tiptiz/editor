import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import PackageJson from "@npmcli/package-json"
import prompts from "prompts"
import semver from "semver"
import $ from "shelljs"
import { loadEnv } from "vite"

const r = (dir = "") => path.join(path.dirname(fileURLToPath(import.meta.url)), "../", dir)

const authToken = loadEnv("npm", r(), "NPM").NPM_PUBLISH_TOKEN

// Define package type
interface Package {
    name: string;
    path: string;
}

// Get all tiptiz-extension packages
const getPackages = (): Package[] => {
    const packagesDir = r("packages")
    return fs.readdirSync(packagesDir)
        .filter(dir => dir.startsWith("tiptiz-extension-"))
        .map(dir => ({
            name: dir,
            path: path.join(packagesDir, dir)
        }))
}

// Version types for selection
type VersionType = 'patch' | 'minor' | 'major' | 'prepatch' | 'preminor' | 'premajor' | 'prerelease';

const versionTypes = [
    { title: 'patch', value: 'patch' },
    { title: 'minor', value: 'minor' },
    { title: 'major', value: 'major' },
    { title: 'prepatch', value: 'prepatch' },
    { title: 'preminor', value: 'preminor' },
    { title: 'premajor', value: 'premajor' },
    { title: 'prerelease', value: 'prerelease' }
];

async function main() {
    // Get all packages
    const packages = getPackages()

    if (packages.length === 0) {
        console.error("No tiptiz-extension packages found!")
        process.exit(1)
    }

    // Create package choices for selection
    const packageChoices = [
        { title: "All packages", value: "all" },
        ...packages.map(pkg => ({
            title: pkg.name,
            value: pkg
        }))
    ]

    // Prompt for package selection
    const packageResponse = await prompts({
        type: 'select',
        name: 'value',
        message: 'Select package to publish:',
        choices: packageChoices
    })

    if (!packageResponse.value) {
        console.log("No package selected. Exiting.")
        process.exit(0)
    }

    const selectedPackage = packageResponse.value

    // Prompt for version type
    const versionResponse = await prompts({
        type: 'select',
        name: 'value',
        message: 'Select version increment type:',
        choices: versionTypes
    })

    if (!versionResponse.value) {
        console.log("No version type selected. Exiting.")
        process.exit(0)
    }

    const versionType = versionResponse.value as VersionType

    // If prerelease type is selected, prompt for prerelease identifier
    let prereleaseId = ""
    if (versionType.includes("pre")) {
        const idResponse = await prompts({
            type: 'text',
            name: 'value',
            message: 'Enter prerelease identifier (e.g., alpha, beta):',
            initial: 'alpha'
        })
        prereleaseId = idResponse.value
    }

    // Determine which packages to update
    const packagesToUpdate: Package[] = selectedPackage === "all" ? packages : [selectedPackage as Package]

    // Update each package version and publish
    for (const pkg of packagesToUpdate) {
        try {
            // Read package.json
            const packageJsonPath = path.join(pkg.path, "package.json")
            const pkgJson = await PackageJson.load(pkg.path)
            const currentVersion = pkgJson.content.version as string

            // Calculate new version
            let newVersion: string | null
            if (versionType === "prerelease" || (versionType.includes("pre") && prereleaseId)) {
                newVersion = semver.inc(currentVersion, versionType, prereleaseId)
            } else {
                newVersion = semver.inc(currentVersion, versionType)
            }

            if (!newVersion) {
                console.error(`Failed to increment version for ${pkg.name}`)
                continue
            }

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

            // Publish the package
            if (authToken) {
                console.log(`Publishing ${pkg.name}@${newVersion}...`)
                if ($.exec(`npm publish --access public${versionType.includes("pre") ? " --tag next" : ""}`).code !== 0) {
                    console.error(`Failed to publish ${pkg.name}`)
                }
            } else {
                console.log(`Skipping publish for ${pkg.name} (no auth token)`)
            }
        } catch (error) {
            console.error(`Error processing ${pkg.name}:`, error)
        }
    }
}

main().catch(err => {
    console.error("Error:", err)
    process.exit(1)
})

