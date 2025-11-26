<script lang="ts">
    import { localState } from "$lib/util.svelte";
    import { writable } from "svelte/store";
    import NavbarItem from "./item.svelte";
    import { Svrollbar, Svroller } from "svrollbar";
    import { USER_GUID } from "$lib/token.svelte";
    // todo!
    let show_on_hover = writable(false) //localState("sidebar_show_collapsed_on_hover", false);
    let states = [0, 52, 200];
    let target_width = $state(states[1]);
    let alloc = $state(states[1]);
    // svelte-ignore state_referenced_locally
    let flex_basis = localState("sidebar_position", target_width);

    flex_basis.subscribe(new_val => {
        if ($show_on_hover) {
            target_width = Math.max(new_val, states[1]);
            alloc = target_width == states[1] ? 0 : states[2];
        } else {
            target_width = new_val;
            alloc = new_val;
        }
    })
 

    let edges : {edge: number, pos: number}[] = [];
    var prev = null;
    for (var s of states) {
        if (prev == null) {
            prev = s;
            continue;
        }
        edges.push({edge: (prev + s) * 0.5, pos:s});
        prev = s;
    }
	function handleMouseDown() {
		function resize(e: MouseEvent) {
            let x = e.clientX;
            flex_basis.set(0);
            for (var edge of edges) {
                if (x > edge.edge) {
                    flex_basis.set(edge.pos);
                }
            }
		}
		function stop() {
			window.removeEventListener('mousemove', resize);
			window.removeEventListener('mouseup', stop);
		}

		window.addEventListener('mousemove', resize);
		window.addEventListener('mouseup', stop);
	}
</script>

<style>
	
@property --w {
    syntax: "<number>";
    inherits: false;
    initial-value: 0px;
}

.sidebar {
    padding: 4px 5px 4px 3px;
    backdrop-filter: blur(8px);
    border-radius: 0 var(--radius-box) var(--radius-box) 0;
    position: absolute;
    box-sizing: border-box;
    min-width: 0;
    overflow-y:scroll;
    transition-property: width;
    transition-duration: 0.1;
    transition-timing-function: cubic-bezier(0.5, 1, 0.89, 1);
    width: 0;
    gap: 7px;
    padding-left: 8px;
}

/* .sidebar_container {
    transition-property: flex-basis;
    transition-duration: 0.1;
    transition-timing-function: cubic-bezier(0.5, 1, 0.89, 1);
} */



</style>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="max-vh shrink w-full flex flex-row relative sidebar_container" style={"flex-basis: " + $flex_basis + "px"}>
    <div data-tauri-drag-region class="absolute vh z-30 sidebar flex flex-col gap-1 no-scrollbar" style="
        --on-hover: {target_width}px;
        {$show_on_hover ? "" : "width: " + target_width + "px;"}
        {target_width == 0 ? "display: none;" : ""}
        "
        >
        <NavbarItem class="navbar_item" link="/0playground" icon="mingcute:bug-line">0playground</NavbarItem>
        <div class="flex-grow pass-trough"></div>
        <NavbarItem class="navbar_item" link="/calls" icon="tabler:phone">Calls</NavbarItem>
        <NavbarItem class="navbar_item" link="/u" icon="mingcute:user-search-line">Users</NavbarItem>
        {#if $USER_GUID == null}
        <NavbarItem class="navbar_item" link="/login" icon="mingcute:user-add-2-line">Login</NavbarItem>
        {:else}
        <NavbarItem class="navbar_item" link="/u/{$USER_GUID}" icon="mingcute:user-3-line">Profile</NavbarItem>
        {/if}
        <NavbarItem class="navbar_item" link="/settings" icon="mingcute:settings-1-line">Settings</NavbarItem>
        <NavbarItem class="navbar_item" link="/new_settings" icon="mingcute:settings-1-line">Settings new</NavbarItem>
        <NavbarItem class="navbar_item" link="/about" icon="mingcute:information-line">About</NavbarItem>
        <div class="flex-grow pass-trough"></div>
    </div>
    <div class="absolute right-[-6px] h-full w-[8px] cursor-e-resize z-30" onmousedown={handleMouseDown}></div>
</div>


