<script lang="ts">
    export let target: "top" | "right" | "bottom" | "left" = "top"
    const rotate = {
        top: "",
        right: "rotate(90, 12, 12)",
        bottom: "rotate(180, 12, 12)",
        left: "rotate(270, 12, 12)"
    }
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$restProps}>
    <path fill="currentColor"
          transform={rotate[target]}
          d="M4 3a1 1 0 0 1 1-1h1.75a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1m5.25 0a1 1 0 0 1 1-1h3.5a1 1 0 1 1 0 2h-3.5a1 1 0 0 1-1-1m7 0a1 1 0 0 1 1-1H19a1 1 0 1 1 0 2h-1.75a1 1 0 0 1-1-1M4 21a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m8.707-15.707a1 1 0 0 0-1.414 0l-5 5a1 1 0 1 0 1.414 1.414L11 8.414V18a1 1 0 1 0 2 0V8.414l3.293 3.293a1 1 0 0 0 1.414-1.414z"/>
</svg>
