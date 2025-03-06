import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Helper function to resolve paths relative to the project root
 * @param dir Directory path relative to project root
 * @returns Absolute path
 */
export const r = (dir = ""): string =>
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../../", dir)
