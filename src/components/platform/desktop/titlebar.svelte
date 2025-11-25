<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onMount, onDestroy } from "svelte";
    import { getCurrentWindow } from '@tauri-apps/api/window';

    let handle: HTMLElement;
    let titlebar: HTMLElement;
    let controls: HTMLElement;

    let hovering = false;

    const appWindow = getCurrentWindow();
    function unfocus(e: any) {
        try { e.target?.blur(); } catch {}
    }

    let lastMouseDownTime = 0;

    onMount(() => {
        function onMove(e: MouseEvent) {
            if (!handle) return;
            const rect = handle.getBoundingClientRect();
            const inside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (inside) {
                hovering = true;
            } else {
                hovering = false;
            }
        }

        function onWindowLeave(e: MouseEvent) {
            hovering = false;
        }

        // todo!: fix with native events
        /*window.addEventListener('mousedown', (e) => {
            lastMouseDownTime = Date.now();
        });

        window.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                const now = Date.now();
                const timeSinceMouseDown = now - lastMouseDownTime;
                if (timeSinceMouseDown > 10) {
                    onWindowLeave(e);
                }
            }
        });*/

        window.addEventListener("mousemove", onMove);
    });
</script>

<div id="titlebar" bind:this={titlebar} class:hovering={hovering}>
    <div data-tauri-drag-region class="drag"></div>
    <div class="titlebar_handle" bind:this={handle}></div>
    <div class="controls w-full h-full flex flex-row items-center justify-end" bind:this={controls}>
        <button class="no-focus unselectable" tabindex="-1" id="titlebar-minimize" on:click={(e) => {unfocus(e); appWindow.minimize()}}> 
            <Icon icon="fluent:minimize-16-filled" height="16px"></Icon>
        </button>
        <button class="no-focus unselectable" tabindex="-1" id="titlebar-maximize" on:click={(e) => {unfocus(e); appWindow.toggleMaximize()}}>
            <Icon icon="fluent:maximize-16-filled" height="16px"></Icon>
        </button>
        <button class="no-focus unselectable" tabindex="-1" id="titlebar-close" on:click={(e) => {unfocus(e); appWindow.close()}}>
            <!-- https://icon-sets.iconify.design/fluent/dismiss-16-filled/ -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="m2.397 2.554l.073-.084a.75.75 0 0 1 .976-.073l.084.073L8 6.939l4.47-4.47a.75.75 0 1 1 1.06 1.061L9.061 8l4.47 4.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L8 9.061l-4.47 4.47a.75.75 0 0 1-1.06-1.061L6.939 8l-4.47-4.47a.75.75 0 0 1-.072-.976l.073-.084z" stroke-width="0.1" stroke="currentColor"/></svg>
        </button>
    </div>
</div>

<style>
:global{
    [data-dbg-hover-region] .titlebar_handle {
        background-color: red;
    }
}

.drag {
    height: 32px;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 10;
    width: 100%;
    pointer-events: auto;
}

.titlebar_handle {
    pointer-events: none;
    height: 12px;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 11;
    width: 100%;
}


#titlebar {
    flex-basis: 0px;
    max-height: 20px;
    user-select: none;
    top: 0;
    left: 0;
    right: 0;
    transition: flex-basis .2s;
}

#titlebar.hovering .titlebar_handle {
    height: 20px;
}

#titlebar.hovering {
    flex-basis: 20px;
}

.controls {
    z-index: 13;
    top: -40px;
    right: 0;
    position: absolute;
    height: 20px;
    width: fit-content;
    transition: top .2s;
}

#titlebar.hovering .controls {
    top: 0;
    z-index: 13;
    right: 0;
    position: absolute;
    height: 20px;
    width: fit-content;
    transition: top .2s;
}

button {
    width: 30px;
    height: 100%;
    appearance: none;
    padding: 0;
    margin: 0;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

button:hover {
    background: #AAA2;
    color: var(--color-base-content);
}

#titlebar-close:hover {
    background: var(--color-error);
}
</style>
