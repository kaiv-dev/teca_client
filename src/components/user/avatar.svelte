<script lang="ts">
  import { refresh_user_miniprofile_cache } from "$lib/globals.svelte";
  import { destroyFollowingMiniprofile, showFollowingMiniprofile } from "$lib/window/util.svelte";
  import { onDestroy } from "svelte";

    let { 
        url,
        class : extra_class = "",
        mini=false,
        hover_profile=null,
        onclick = () => {},
        ...rest
    } : {
        url: { path?: string | null; nickname?: string },
        class?: String,
        mini?: boolean,
        hover_profile?: string | null,
        onclick?: (e: MouseEvent) => void
    } = $props();
    // Get identifier (either path or nickname)
    let identifier = url.path ?? url.nickname ?? "";

    function hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    }
    let hue = url.nickname ? hashString(url.nickname) % 360 : 0;
    let firstLetter = url.nickname?.[0]?.toUpperCase() ?? "?";
    let id = "miniprofile_"+hover_profile + Math.ceil(Math.random() * 1000000);
    onDestroy(() => {
        destroyFollowingMiniprofile(id);
    })
</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="{extra_class}" 
    onclick={onclick} 
    onmouseenter={() => {if (hover_profile) showFollowingMiniprofile(hover_profile, id)}}
    onmouseleave={() => {if (hover_profile) destroyFollowingMiniprofile(id)}}
    >
    {#if url.path}
        <img class="mini-bg pointer-events-none" src={url.path} alt="" onerror={(em: any) => {em.currentTarget.src="/placeholder.jpg"}}>
    {:else}
        <div class="fallback-avatar" style="--hue: {hue}; font-size: {mini ? "16px" : "32px"}">
            {firstLetter}
        </div>
    {/if}
</div>

<style>
    .fallback-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        /* font-size: x-large; */
        background-color: hsl(var(--hue), 70%, 50%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
</style>