import { writable, type Readable, type Writable } from "svelte/store";
import { refresh } from "./api/auth.svelte";
import { get } from "svelte/store";
import { parseJwt } from "./util.svelte";

export var ACCESS_TOKEN : Writable<null | string> = writable(null);
export var USER_GUID : Writable<null | string> = writable(null);
let refreshTimeout: number | null = null;

export function setAccess(token: {access_token: string, exp: number} | null) {
    if (token == null){USER_GUID.set(null); ACCESS_TOKEN.set(null); return;}
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
    }
    const now = Math.floor(Date.now() / 1000);
    const delay = (token.exp - now - 10) * 1000;
    if (delay > 0) {
        ACCESS_TOKEN.set(token.access_token);
        console.log("[SYSTEM] access_token", token.access_token);
        let guid = parseJwt(token.access_token).user;
        USER_GUID.set(guid);
        console.log('[SYSTEM] user_guid', guid);
        refreshTimeout = setTimeout(() => {
            refreshToken();
        }, delay);
    } else {
        ACCESS_TOKEN.set(null);
        USER_GUID.set(null);
        refreshToken();
    }
}

async function refreshToken() {
    await refresh()
}