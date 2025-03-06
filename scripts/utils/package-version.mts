import prompts from "prompts"
import semver from "semver"

import { Package } from "./package-info.mjs"

// Version types for selection with examples
export type VersionType = "patch" | "minor" | "major" | "prepatch" | "preminor" | "premajor" | "prerelease"

// Create version types with examples
export const versionTypes = [
    { value: "patch", description: "Increment the patch version (for backwards compatible bug fixes)" },
    { value: "prepatch", description: "Increment to a pre-release patch version" },
    { value: "minor", description: "Increment the minor version (for new backwards compatible functionality)" },
    { value: "preminor", description: "Increment to a pre-release minor version" },
    { value: "major", description: "Increment the major version (for incompatible API changes)" },
    { value: "premajor", description: "Increment to a pre-release major version" },
    { value: "prerelease", description: "Increment an existing pre-release version" }
]

// Package update information
export interface PackageUpdate {
    package: Package
    versionType: VersionType
    prereleaseId?: string
    newVersion?: string
}

// Common prerelease identifiers
const prereleaseIdentifiers = [
    { title: "alpha (α) - Early testing", value: "alpha" },
    { title: "beta (β) - Feature complete, possible bugs", value: "beta" },
    { title: "rc (Release Candidate) - Final testing", value: "rc" },
    { title: "next - Upcoming release", value: "next" },
    { title: "dev - Development build", value: "dev" },
    { title: "experimental - Experimental features", value: "experimental" },
    { title: "custom - Enter custom identifier", value: "custom" }
]

/**
 * Select a prerelease identifier from predefined options or custom input
 * @param packageName Name of the package for display purposes
 * @returns Promise<string> Selected prerelease identifier
 */
export const selectPrereleaseIdentifier = async (packageName: string): Promise<string> => {
    // First select from common identifiers
    const identifierResponse = await prompts({
        type: "select",
        name: "value",
        message: `Select prerelease identifier for ${packageName}:`,
        choices: prereleaseIdentifiers
    })

    if (!identifierResponse.value) {
        process.exit(1)
    }

    let prereleaseId = identifierResponse.value

    // If custom was selected, prompt for custom identifier
    if (prereleaseId === "custom") {
        const customResponse = await prompts({
            type: "text",
            name: "value",
            message: "Enter custom prerelease identifier:",
            validate: value => value.trim() !== "" ? true : "Identifier cannot be empty"
        })

        if (!customResponse.value) {
            process.exit(1)
        }

        prereleaseId = customResponse.value
    }

    return prereleaseId
}

/**
 * Create a version example specific to the current package version
 * @param pkg Package with current version
 * @param type Version increment type
 * @param prereleaseId Optional prerelease identifier
 * @returns Example of the new version
 */
const getPackageSpecificExample = (pkg: Package, type: VersionType, prereleaseId?: string): string => {
    const currentVersion = pkg.version

    if (type === "prerelease" || (type.includes("pre") && prereleaseId)) {
        return semver.inc(currentVersion, type, prereleaseId) || ""
    } else {
        return semver.inc(currentVersion, type) || ""
    }
}

/**
 * Prompt for version type for a specific package
 * @param pkg Package to select version for
 * @returns Promise<PackageUpdate | null> Package update info or null if skipped
 */
export const selectVersionForPackage = async (pkg: Package): Promise<PackageUpdate | null> => {
    console.log(`\nConfiguring version update for:\n ${pkg.name} (current: v${pkg.version})`)

    // Create package-specific version choices
    const packageVersionChoices = versionTypes.map(type => ({
        title: `${type.value} (${pkg.version} → ${getPackageSpecificExample(pkg, type.value as VersionType)})`,
        value: type.value,
        description: type.description
    }))

    // Prompt for version type for this package
    const versionResponse = await prompts({
        type: "select",
        name: "value",
        message: `Select version increment type for ${pkg.name}:`,
        choices: packageVersionChoices
    })

    if (!versionResponse.value) {
        process.exit(1)
    }

    const versionType = versionResponse.value as VersionType
    const packageUpdate: PackageUpdate = {
        package: pkg,
        versionType
    }

    // If prerelease type is selected, prompt for prerelease identifier
    if (versionType.includes("pre")) {
        packageUpdate.prereleaseId = await selectPrereleaseIdentifier(pkg.name)
    }

    // Calculate new version
    const currentVersion = pkg.version
    let newVersion: string | null

    if (versionType === "prerelease" || (versionType.includes("pre") && packageUpdate.prereleaseId)) {
        newVersion = semver.inc(currentVersion, versionType, packageUpdate.prereleaseId)
    } else {
        newVersion = semver.inc(currentVersion, versionType)
    }

    if (!newVersion) {
        console.error(`Failed to calculate new version for ${pkg.name}`)
        return null
    }

    packageUpdate.newVersion = newVersion
    console.log(`${pkg.name}: ${currentVersion} → ${newVersion}`)

    return packageUpdate
}

/**
 * Collect version information for multiple packages
 * @param selectedPackages Packages to collect version info for
 * @returns Promise<PackageUpdate[]> Array of package updates
 */
export const collectVersionInfo = async (selectedPackages: Package[]): Promise<PackageUpdate[]> => {
    const packagesToUpdate: PackageUpdate[] = []

    // Ask for version type for each package individually
    for (const pkg of selectedPackages) {
        const packageUpdate = await selectVersionForPackage(pkg)
        if (packageUpdate) packagesToUpdate.push(packageUpdate)
    }

    if (packagesToUpdate.length === 0) {
        console.log("No packages to update. Exiting.")
        process.exit(0)
    }

    return packagesToUpdate
}
