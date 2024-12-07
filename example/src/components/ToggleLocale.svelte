<script lang="ts">
    import SvgI18n from "@/icons/SvgI18n.svelte"

    import { Button } from "@/components/ui/button"
    import { locale, locales, t } from "@/utils/i18n"

    const toggleLocale = () => {
        locale.set($locale === locales[0] ? locales[1] : locales[0])
    }
</script>

<Button class="py-0 px-2 h-[26px] rounded" variant="secondary" on:click={toggleLocale}>
    <SvgI18n width="20" height="20"/>
    <div class="w-16">{$t($locale)}</div>
</Button>
