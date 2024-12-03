<script lang="ts">
    export let color: string = ""
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
    <g fill="none" transform="translate(1 1)">
        <path stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="m5.719 16.25l1.92-4.404m0 0h6.91m-6.91 0l2.94-6.747a.553.553 0 0 1 1.029 0l2.941 6.747m0 0l.337.774"/>
    </g>
    <g transform="scale(0.95) translate(2 -1)">
        <path fill={color || "currentColor"}
              d="M15.68 20.936a2.5 2.5 0 0 0 1.218-.673l5.455-5.45a2.526 2.526 0 1 0-3.57-3.573l-5.453 5.452c-.335.336-.57.76-.675 1.222l-.535 2.354a1.007 1.007 0 0 0 1.206 1.206z"/>
        <path stroke={color || "currentColor"}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              d="m3.75 19.687l.568.234c.638.263 1.364.175 1.956-.18c.69-.411 1.649-.915 2.483-1.1c.583-.13 1.243.199 1.091.776c-.17.642-.69 1.396-.192 1.745c.75.525 5.031-.818 5.031-.818"/>
    </g>
</svg>
