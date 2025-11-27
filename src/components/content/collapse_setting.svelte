<script lang="ts">
    import Icon from "@iconify/svelte";
    let { icon, open = $bindable() } = $props();
</script>

<style>
    .collapse-content {
        transition:
            visibility 0.2s, 
            padding 0.2s ease-out;
    }
</style>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="w-full relative">
    <div tabindex="0" class="collapse collapse-arrow card-100 main_content_outer_shadow">
        <input type="checkbox" bind:checked={open}/>
        <div class="collapse-title font-semibold flex flex-row gap-2 items-center text-2xl ">
            <Icon height=32px icon={icon}/>
            <slot name="title"/>
        </div>
        <div class="collapse-content bg-inherit">
            <slot name="content"/>
        </div>
    </div>
</div>
