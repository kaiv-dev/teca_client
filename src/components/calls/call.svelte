<script lang="ts">
  import { onMount, tick } from "svelte";
  import Scrollable from "../containers/scrollable.svelte";
  import { Svrollbar } from "svrollbar";
  import { best_grid } from "$lib/util.svelte";
  import Button from "../content/button.svelte";
  import Icon from "@iconify/svelte";



    let users = $state([
        {id: '1', name: 'Avatar 1'},
        {id: '2', name: 'Avatar 2'},
        {id: '3', name: 'Avatar 3'},
        {id: '4', name: 'Avatar 3'},
        {id: '5', name: 'Avatar 3'},
        {id: '6', name: 'Avatar 3'},
    ]);
    let cols = $state(2);


    async function add_user(){
        let u = Math.round(Math.random() * 1000000);
        users.push({id: `${u}`, name: `Avatar ${u}`});
        recalc_grid()
    }
    async function remove_user(){
        users.pop();
        recalc_grid()
    }
    let aspect = 16 / 9;

    
    let container: HTMLElement | null = $state(null);
    let w = $state(1);
    let h = $state(1);
    onMount(() => {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          w = width;
          h = height;
          recalc_grid();
        }
      });
      if (!container) return;
      observer.observe(container);
    });

    let iw = $state(0);
    const min_size = 300;
    function recalc_grid(){
        const best = best_grid(w/h, aspect, users.length);
        if (!best) return
        cols = best.cols
        let c = w / cols
        let r = h / best.rows * aspect
        let t = Math.ceil(w / min_size);
        cols = Math.min(cols, t)
        iw = Math.min(c, r)
    }

    let viewport: HTMLElement | null = $state(null);
    let contents: HTMLElement | null = $state(null);
</script>






<style>
    .parent {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
        overflow: hidden;
        align-items: flex-start;
        overflow-y: auto;
        overflow-x: hidden; 
    }


    .container {
        display: grid;
        grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
        align-items: center;
        justify-content: center;
        align-content: center;
        max-width: 100%;
        max-height: 100%;
        width: fit-content;
        /* height: 100%; */
        justify-content: center;
        align-content: center;
        position: relative;
    }

    .subcontainer {
        aspect-ratio: 16 / 9;
        height: auto; 
        background-color: #000A;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }
</style>

<div class="parent flex flex-col">
    <div bind:this={container} style="--cols:{cols}; --aspect:{aspect}" class="w-full flex-grow">
        <Scrollable class="w-full h-full flex items-center justify-center"
            viewport_class="max-h-full w-fit"
            content_class="h-fit flex items-center w-fit"
        >

            <div class="w-full h-full container">
                {#each  users as user (user.id) }
                    <div class="subcontainer" style="width: {iw}px; height: {iw / aspect}px">{user.name}</div>
                {/each}
            </div>
        </Scrollable>
    </div>
    <div class="w-full h-16 relative flex flex-row justify-center items-center gap-2 pt-3">
        <button class="btn btn-border min-h-[44px] px-3 btn-primary"><Icon icon="mage:microphone-fill" width=32px></Icon></button>
        <button class="btn btn-border min-h-[44px] px-3 btn-primary"><Icon icon="mage:microphone-mute-fill" width=32px></Icon></button>
        <button class="btn btn-border min-h-[44px] px-3 btn-primary"><Icon icon="mage:headphone-mute-fill" width=32px></Icon></button>
        <button class="btn btn-border min-h-[44px] px-3 btn-primary"><Icon icon="majesticons:headset" width=32px></Icon></button>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="btn btn-border min-h-[44px] px-3 btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M21.488 2.556a.75.75 0 0 0-1.06 0l-1.95 1.95a10 10 0 0 0-10.32-1.66a10 10 0 0 0-6.16 9.22v6.6a3.5 3.5 0 0 0 .51 1.81a.74.74 0 0 0 0 1.06a.7.7 0 0 0 .53.22a.74.74 0 0 0 .53-.22l.52-.52l4.41-4.41l.09-.09l10.49-10.44l2.46-2.46a.75.75 0 0 0-.05-1.06m-13.2 12.14a3.4 3.4 0 0 0-.69-.83a3.47 3.47 0 0 0-4.1-.26v-1.53a8.48 8.48 0 0 1 13.92-6.5zm13.71-2.62v6.6q.008.075 0 .15a3.38 3.38 0 0 1-3.37 3.08a3.39 3.39 0 0 1-3.39-3.19v-2.64a3.4 3.4 0 0 1 1.06-2.31a3.49 3.49 0 0 1 4.22-.33v-1.36a8.7 8.7 0 0 0-.92-3.88a.75.75 0 0 1 .33-1a.77.77 0 0 1 1 .33a10.2 10.2 0 0 1 1.07 4.55" stroke-width="0.9" stroke="currentColor"/></svg></button>
        <button class="btn btn-border min-h-[44px] px-3 btn-error"><Icon icon="fluent:call-end-16-filled" width=32px></Icon></button>
    </div>
</div>

<!-- <div class="absolute top-2 right-2">
    <button class="btn btn-primary" onclick={add_user}>Add user</button>
    <button class="btn btn-error" onclick={remove_user}>Remove user</button>
</div> -->

