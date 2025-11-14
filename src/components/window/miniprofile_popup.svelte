<script lang="ts">
  import { easeOutQuint, type Vec2 } from "$lib/util.svelte";
    import { set_window_size } from "$lib/window/floating.svelte";
  import { fly, scale } from "svelte/transition";
    import Miniprofile from "../user/miniprofile.svelte";
    let {window_id, user_id} = $props();
    function update_size(size: Vec2) {
        set_window_size(window_id, size);
    }
</script>

<!-- TODO! USE SINGLE POPUP FOR ALL MINIPROFILES -->
<div
transition:scale={{duration: 300, easing: easeOutQuint}}
>
<Miniprofile user_id={user_id} on_size_changed={update_size}></Miniprofile>
</div>