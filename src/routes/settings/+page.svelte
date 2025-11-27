<script lang="ts">
    import Icon from "@iconify/svelte";
    import CollapseSetting from "$lib/../components/content/collapse_setting.svelte";
    import ColorPicker, { type RgbaColor } from 'svelte-awesome-color-picker';
    import { default_themes, appThemeTypes, setDefaultTheme, THEME, serializeTheme, deserializeTheme, setNonOverrideTheme, applyTheme, themeToData, themeToStyle, type AppTheme} from "$lib/theme/app.svelte";
    import { get, type Writable } from "svelte/store";
    import LabelSeparator from "$lib/../components/content/label_separator.svelte";
    import BorderInput from "$lib/../components/content/border_input.svelte";
    import BorderCheckbox from "$lib/../components/content/border_checkbox.svelte";
    import { updated } from "$app/state";
    import Button from "$lib/../components/content/button.svelte";
    import { localState, prettify, shakeById, vec2 } from "$lib/util.svelte";
    import ThemePreview from "$lib/../components/content/theme_preview.svelte";
    import { DefaultWindow, openFloating, type FloatingWindow, type FloatingWindowType, DefaultWindowType } from "$lib/window/floating.svelte";
    import AppThemeEditor from "$lib/../components/window/app_theme_editor.svelte";
    import { logout } from "$lib/api/auth.svelte";
    import Miniprofile from "$lib/../components/user/miniprofile.svelte";
    import MiniprofileEditor from "$lib/../components/window/miniprofile_editor.svelte";
    import { USER_GUID } from "$lib/token.svelte";
    import Separator from "$lib/../components/content/separator.svelte";
    import Popup from "$lib/../components/popup.svelte";
    import { type MiniprofileTheme } from "$lib/theme/miniprofile.svelte";
    import { newToast } from "$lib/toast.svelte";
    import { media_limit, MEDIA_RULE } from "$lib/globals.svelte";
    import SettingTheme from "./setting_theme.svelte";
    import SettingWindow from "./setting_window.svelte";
  import { isDesktop } from "$lib/platform.svelte";
    
    
    let themes : Writable<Record<string, string>> = localState("saved_themes", {});
    
    let parsed_themes : Record<string, AppTheme> = $state({});


    for (let [key, serialized] of Object.entries($themes)) {
        let theme = deserializeTheme(serialized);
        parsed_themes[key] = theme;
    }

    themes.subscribe(() => {
        for (let [key, serialized] of Object.entries($themes)) {
            if (parsed_themes.hasOwnProperty(key)) continue;
            let theme = deserializeTheme(serialized);
            parsed_themes[key] = theme;
        }
    })

    let theme_name = $state("");
    function saveTheme(){
        if (theme_name == "") {
            shakeById("theme_name")
            return;
        }
        let force_update = theme_name in $themes;
        let theme =  get(THEME);
        $themes[theme_name] = serializeTheme(theme);
        if (force_update) {
            updater += 1;
            console.log("Force update")
        }
        parsed_themes[theme_name] = theme;
        // theme_name = "";
    }
    function deleteTheme(name: string){
        delete parsed_themes[name];
        delete $themes[name];
    }


    function openPicker(){
        openFloating({
            ...DefaultWindow,
            component: AppThemeEditor,
            min_size: vec2(265, 300),
            size: vec2(600, 600),
            max_size: vec2(600, 900),
            id: "theme_editor",
            type: {...DefaultWindowType} as FloatingWindowType,
            props: {
                id: "theme_editor",
            }
        } as FloatingWindow);       

    }
    type PopupEdit = 'bg' | 'avatar' | 'nickname';
    const MINIPROFILE_PREVIEW = "miniprofile_preview";
    let popup : PopupEdit | null = $state(null);
    
    const start_edit_miniprofile : (initial_theme: MiniprofileTheme | null) => void = (initial_theme: MiniprofileTheme | null) => {
        openFloating({
            ...DefaultWindow,
            component: MiniprofileEditor,
            size: vec2(265, 700),
            min_size: vec2(265, 300),
            max_size: vec2(300, 800),
            id: "miniprofile_editor",
            type: {...DefaultWindowType} as FloatingWindowType,
            props: {
                id: "miniprofile_editor",
                onclose: () => {profile_editor += 1},
                refresh_preview: () => {profile_editor += 1},
                initial_theme: initial_theme,
                em_id: MINIPROFILE_PREVIEW
            }
        } as FloatingWindow); 
    };
    let profile_editor = $state(0);
    let updater = $state(0);
</script>


<div 
style=""
class="flex justify-center relative p-2 overflow-y-scroll h-full"
>

{#if popup}
  <Popup on_deny={() => {popup = null}} class="absolute">
    <strong class="text-center flex items-center">Drop media!</strong>
    <Separator/>
    <div class="flex flex-row gap-2">
        <button class="btn btn-primary" onclick={() => {popup = null}}>Choose file</button>
    </div>
</Popup>
{/if}

<div class="w-full flex relative flex-col gap-2 max-w-[900px]">
    {#if isDesktop()}
    <SettingWindow/>
    {/if}
    <SettingTheme/>
    <div class="min-h-[64px]"></div>
</div>
</div>