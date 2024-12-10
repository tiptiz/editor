<script lang="ts">
    import SvgI18n from "@/icons/SvgI18n.svelte"

    import { Button } from "@/components/ui/button"
    import { locale, locales, t } from "@/utils/i18n"

    const toggleLocale = () => {
        locale.set($locale === locales[0] ? locales[1] : locales[0])
    }
</script>

<Button class="py-0 px-2 h-7 rounded" variant="secondary" on:click={toggleLocale}>
    <SvgI18n width="18" height="18"/>
    <div class="w-16">{$t($locale)}</div>
</Button>
