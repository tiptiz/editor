import { Writable } from "node:stream"

/**
 * Simple filtered output stream for command outputs
 */
export function createFilteredOutputStream(): Writable {
    return new Writable({
        write(chunk, _, callback) {
            const output = chunk.toString()
            // Only pass through non-progress and non-exit messages
            if (!output.includes("Progress") && !output.includes("exit with code 0")) {
                process.stdout.write(chunk)
            }
            callback()
        }
    })
}

