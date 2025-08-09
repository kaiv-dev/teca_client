import { platform } from '@tauri-apps/plugin-os';
import { listen } from '@tauri-apps/api/event';
function get_platform() {
    try {
        return platform()
    } catch {
        return "web"
    }
}

export const currentPlatform = get_platform();
console.debug("[SYSTEM] Current platform ", currentPlatform)

export function isDesktop() : boolean {
    return currentPlatform == "windows" || currentPlatform == "linux"
}
if (isDesktop()) {
    listen('global-key', (event: any) => {
        // todo!
        // console.log('Key pressed:', event.payload);
    });
}
