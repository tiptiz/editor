import { execSync } from "node:child_process"
import fs from "node:fs"

import { getPackages } from "./utils/package-info.mjs"
import { r } from "./utils/paths.mjs"

/**
 * Creates symbolic links for all tiptiz-extension packages
 * This allows local development with the packages linked to each other
 */
async function linkPackages() {
    console.log("🔗 Linking tiptiz-extension packages...")

    try {
        // Get all extension packages
        const packages = await getPackages()

        if (packages.length === 0) {
            console.log("❌ No tiptiz-extension packages found!")
            process.exit(1)
        }

        console.log(`📦 Found ${packages.length} packages to link:`)
        packages.forEach(pkg => console.log(`   - ${pkg.name} (v${pkg.version})`))

        // For each package, build it and create a symbolic link
        for (const pkg of packages) {
            console.log(`\n🔨 Building and linking ${pkg.name}...`)

            // Build the package
            try {
                console.log(`   Building ${pkg.name}...`)
                execSync("pnpm build", {
                    cwd: pkg.path,
                    stdio: "inherit"
                })
            } catch (error) {
                console.error(`❌ Failed to build ${pkg.name}:`, error)
                continue
            }

            // Create symbolic link using pnpm link
            try {
                console.log(`   Linking ${pkg.name}...`)
                execSync("pnpm link --global", {
                    cwd: pkg.path,
                    stdio: "inherit"
                })
            } catch (error) {
                console.error(`❌ Failed to link ${pkg.name}:`, error)
            }
        }

        // Now link the packages to the editor components package
        const editorComponentsPath = r("packages/tiptiz-editor-components")

        if (fs.existsSync(editorComponentsPath)) {
            console.log("\n🔗 Linking packages to tiptiz-editor-components...")

            for (const pkg of packages) {
                try {
                    console.log(`   Linking ${pkg.name} to editor components...`)
                    execSync(`pnpm link --global ${pkg.name}`, {
                        cwd: editorComponentsPath,
                        stdio: "inherit"
                    })
                } catch (error) {
                    console.error(`❌ Failed to link ${pkg.name} to editor components:`, error)
                }
            }
        }

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
