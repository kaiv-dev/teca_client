import type { MiniProfile } from "$lib/api/profile.svelte";
import { closeFloating, DefaultWindow, half_screen, openFloating, smoothCloseFloating, type FloatingWindow } from "./floating.svelte";
import MiniprofilePopup from "$lib/../components/window/miniprofile_popup.svelte";
import { MOUSE_POS, refresh_user_miniprofile_cache } from "$lib/globals.svelte";
import { get } from "svelte/store";
import { vec2, sub } from "$lib/util.svelte";





export function showFollowingMiniprofile(guid: string, id: string){
    refresh_user_miniprofile_cache(guid);

    openFloating({
            ...DefaultWindow,
            component: MiniprofilePopup,
            min_size: vec2(265, 300),
            size: vec2(340, 120), //340 120
            pos: sub(MOUSE_POS, half_screen),
            id: id,
            type: {mode: "follow", id: guid, delay: 0, remaining: 0, x_offset: 32},
            props: {
                window_id: id,
                user_id: guid,
            }
        } as FloatingWindow); 
}

export function destroyFollowingMiniprofile(id: string){
    closeFloating(id);
}