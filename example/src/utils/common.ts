export function* range(start: number, end: number, equal = true): Generator<number> {
    for (let i = start; equal ? i <= end : i < end; i++) yield i
}
