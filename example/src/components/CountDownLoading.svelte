<script lang="ts">
    interface Props {
        enable: boolean
        behavior?: "reset" | "continue"
        count: number
        format?: (value: number) => string
        step?: number
        delay?: number
        ondispatch?: () => void
    }

    const { enable, behavior, ondispatch, count: _count, format, step = 1, delay = 1000 }: Props = $props()

    let count = $state(_count)
    let timer: number
    const counter = () => {
        timer = window.setTimeout(() => {
            count = Math.max(0, (behavior === "reset" ? _count : count) - step)
            if (count === 0) {
                count = _count
                ondispatch?.()
            }
            counter()
        }, delay)
    }
    $effect(() => {
        if (timer) window.clearTimeout(timer)
        if (enable) counter()
    })
</script>

{format ? format(count) : `${count}s`}
