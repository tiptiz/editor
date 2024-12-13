export function* range(start: number, end: number, equal = true): Generator<number> {
    for (let i = start; equal ? i <= end : i < end; i++) yield i
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getAsset = (path: string) =>
    fetch(`/content?filepath=${path}`, { method: "GET" })
        .then(res => res.body.getReader().read())
        .then(({ value }) => new TextDecoder().decode(value))

export const saveAsset = (path: string, content: string) =>
    fetch("/content", {
        method: "PUT",
        body: content,
        headers: {
            "content-file-path": path
        }
    })
