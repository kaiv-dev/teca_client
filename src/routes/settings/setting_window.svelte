<script lang="ts">
    import { localState } from "$lib/util.svelte";
    import BorderCheckbox from "../../components/content/border_checkbox.svelte";
    import CollapseSetting from "../../components/content/collapse_setting.svelte";

    let title_always = localState("title_always", false);
    let opened = localState("setting_window_open", true);
</script>
<CollapseSetting icon="mingcute:layout-top-line" bind:open={$opened}> 
    <div slot="title">Window</div>
    <div slot="content" class=" h-fit flex flex-col gap-2 bg-inherit relative p-2">
        <BorderCheckbox bind:checked={$title_always} class="checkbox-primary" label="Always show titlebar"/>
    </div>
</CollapseSetting>