import type { Extension, Mark, Node } from "@tiptap/core"

export type PreConfigOption<T> = false | Partial<T> | ((presets?: Partial<T>) => Partial<T>)
export type AnyExtension<T = any, S = any> = Mark<T, S> | Node<T, S> | Extension<T, S>

/**
 * Configure a Tiptap extension with options
 *
 * @param extension The extension to configure
 * @param options Configuration options (false to disable, object to configure, function to customize)
 * @param presets Default configuration presets
 * @returns Configured extension or null if disabled
 */
export function withPreConfigure<T = any, S = any, E extends { configure: (this: E, options: Partial<T>) => E } = AnyExtension<T, S>>(
    extension: E, options: PreConfigOption<T> = {}, presets?: Partial<T>
): E | null {
    if (options === false) return null
    else if (typeof options === "function")
        return extension.configure(options(presets))
    else if (options)
        return extension.configure(options)
    else
        return extension.configure(presets)
}
