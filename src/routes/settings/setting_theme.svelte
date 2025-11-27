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

    let opened = localState("theme_window_open", true);
    
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
    let updater = $state(0);
</script>

<style>
:global {
    .themes {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    .theme_settings {
        grid-template-rows: repeat(auto-fill, minmax(24px, 1fr));
    }
}
</style>

<CollapseSetting icon="mingcute:paint-brush-ai-line" bind:open={$opened}>
    <!-- TODO: ACTIVE STYLE -->
    <div slot="title">Theme</div>
    <div slot="content" class=" h-fit flex flex-col gap-2 bg-inherit relative">
        <!-- <LabelSeparator><h2>Customize</h2></LabelSeparator> -->
        <div class="flex flex-row p-2 card-base card-200 card-200-border main_content_shadow">
            <div class="grid theme_settings w-full h-fit gap-2 grid-flow-row no-alpha">
                {#each appThemeTypes.fake_rgba as t}
                    <ColorPicker
                        label={$THEME[t].display_name}
                        isAlpha={false}
                        bind:rgb={$THEME[t].value as RgbaColor /*stupid ts*/}
                    />
                {/each}
                <div class="flex items-center gap-2">
                    <label class="cursor-pointer flex items-center gap-2 pl-2"><BorderCheckbox bind:checked={$THEME.neo.value} class="checkbox-primary"/>Neo theme?</label> 
                </div>
                {#each appThemeTypes.px as t}
                    <div class="flex h-full w-full items-center font-semibold">{$THEME[t].display_name}</div>
                    <input type="range" min="0" max="20" class="range" bind:value={$THEME[t].value} />
                {/each}

                {#each appThemeTypes.percent as t}
                    <div class="flex h-full w-full items-center font-semibold">{$THEME[t].display_name}</div>
                    <input type="range" min="0" max="20" class="range" bind:value={$THEME[t].value} />
                {/each}
            </div>
        </div>
        <div class="flex flex-row p-2 gap-2 w-full">
            <button onclick={async () => {let theme = deserializeTheme(await navigator.clipboard.readText());setNonOverrideTheme(theme)}} class="z-[1] tooltip tooltip-right btn btn-border btn-primary hover:btn-error" data-tip="Paste from clipboard"><Icon height=24px icon="tabler:clipboard"/></button>
            <button onclick={() => {let theme = serializeTheme($THEME);navigator.clipboard.writeText(theme);}} class="tooltip btn btn-border btn-primary" data-tip="Copy to clipboard"><Icon height=24px icon="tabler:copy"/></button>
            
            <BorderInput id="theme_name" placeholder="Theme name" 
                icon="mingcute:palette-line" class="flex-grow input-primary main_content_shadow" bind:value={theme_name}>
            </BorderInput>

            <Button icon="mingcute:save-2-line" class="btn btn-primary btn-border pr-2" onclick={saveTheme}>Save Theme</Button>
            <Button icon="mingcute:pin-line" class="btn btn-primary btn-border pr-2" onclick={openPicker}>Unpin picker</Button>
        </div>
        <LabelSeparator><h2>Your themes</h2></LabelSeparator>
        {#key updater}
        <div class="grid themes gap-2">
                {#each Object.entries(parsed_themes) as [key, theme] (key)}
                    <ThemePreview
                    theme={{theme: theme, name: key}}
                    onclick={()=> {setNonOverrideTheme(theme); theme_name = key;}}
                    >
                    <Button icon="tabler:trash" class="btn btn-border btn-error w-full pr-1" onclick={(e : MouseEvent) => {e.preventDefault(); e.stopPropagation(); deleteTheme(key)}}></Button>
                    </ThemePreview>
                {/each}
        </div>  
        {/key}
        <LabelSeparator><h2>Default presets</h2></LabelSeparator>
        <div class="grid themes gap-2">
            {#each default_themes as t}
                <ThemePreview 
                    theme={t}
                    onclick={() => {theme_name = prettify(t); setDefaultTheme(t)}}
                >
                </ThemePreview>
            {/each}
        </div>  
        
    </div>
</CollapseSetting>