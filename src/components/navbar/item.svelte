<script lang="ts">
    import Icon from "@iconify/svelte";
    let {
        link,
        icon,
        class : extra_class = ""
    } : {
        link: string,
        icon: string,
        class?: string
    } = $props(); 
    import { page } from '$app/state';
</script>
<!-- TODO: ACTIVE STYLE -->
<a href={link} class={
        `relative btn btn-primary gap-2 flex flex-row navbar_button 
        ${page.url.pathname.startsWith(link) ? "active_navbar_button" : "btn-ghost"}
        ${extra_class}`
    }>
    <Icon icon={icon} height=24px class="min-w-[24px] shd"/>
    <slot></slot>
</a>

<style>


:global {
    .navbar_button {
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
        min-height: 40px;
        line-height: 1rem;
        padding: 2px 2px 2px 8px;
        align-items: center;
        justify-content: start;
        overflow: hidden;
        border: 0;
        border-radius: var(--radius-field);
        color: var(--color-primary);
        /* color: color-mix(in srgb, var(--color-primary) var(--tint-200), #FFF); */
        /* transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); */
        transition-property: box-shadow, color;
        transition-duration: 0.3s;
        background: none;
    }

    .navbar_button:hover, .active_navbar_button {
        color: var(--color-primary);
        box-shadow:
            0px 0px 3px 3px var(--color-soft-shadow),
            inset 0px 0px 3px 3px transparent
            ;
        border: 2px solid #AAAAAA0F;
        padding-left: 6px;
    }
    .navbar_button:active, .active_navbar_button:active {
        border: 0;
        color: color-mix(in srgb, var(--color-primary) var(--tint-200), #444);
        background-color: var(--tinted-sec-200o);
        box-shadow:
            0px 0px 3px 3px transparent,
            inset 0px 0px 3px 3px var(--color-soft-shadow)
            ;
    }

    .navbar_button:focus, .active_navbar_button:focus {
        outline: 0;
        border: 2px solid #AAAAAA0F;
        padding-left: 6px;
        /* color: var(--color-base-content); */
    }
}
</style>