import { derived, get, writable, type Readable, type Writable } from "svelte/store";
import { isDesktop } from "./platform.svelte";
import { localState, vec2, type Vec2 } from "./util.svelte";
import { get_miniprofile, type MiniProfile } from "./api/profile.svelte";

export const media_limit = 0.25;
export type MEDIA_RULE_TYPE = "none" | "catbox"; 
export const MEDIA_RULE : Writable<MEDIA_RULE_TYPE> = localState("media_rule_setting", "none");
export let MOUSE_POS : Vec2 = {x: 0, y: 0};

document.documentElement.addEventListener("mousemove", (e : MouseEvent) => {
    MOUSE_POS = vec2(e.clientX, e.clientY);
});

export type UserCache = {
    miniprofile: MiniProfile | null,
}

const ALL_USER_PROFILE_CACHE : Writable<Record<string, UserCache>> = writable({});
const USER_PROFILE_CACHE : Record<string, Readable<UserCache>> = {};

export function get_profile_cache(guid: string) : Readable<UserCache | null> {
    if (!USER_PROFILE_CACHE[guid]) {
        USER_PROFILE_CACHE[guid] = derived(ALL_USER_PROFILE_CACHE, (profile_cache) => {
            return profile_cache[guid] ?? null;
        });
    }
    return USER_PROFILE_CACHE[guid];
}

const USER_PROFILE_CACHE_DELAY = 10000;
const USER_PROFILE_CACHE_REFRESHES = new Map<string, number>();

export async function refresh_user_miniprofile_cache(guid: string){
    let last_refresh = USER_PROFILE_CACHE_REFRESHES.get(guid);
    let now = Date.now();
    if (last_refresh && now < last_refresh + USER_PROFILE_CACHE_DELAY) return;
    USER_PROFILE_CACHE_REFRESHES.set(guid, now);
    let v : MiniProfile | null = await get_miniprofile(guid);
    let t = v?.encoded_theme ?? "";
    ALL_USER_PROFILE_CACHE.update(profile_cache => ({
        ...profile_cache,
        [guid]: { miniprofile: v, miniprofile_style: t }
    }));
}
