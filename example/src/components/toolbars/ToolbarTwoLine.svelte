<script lang="ts">
    const { class: classes = "", children, ...restProps } = $props()
</script>
<div class={`flex items-center flex-wrap ${classes}`} {...restProps}>
    {@render children?.()}
</div>
