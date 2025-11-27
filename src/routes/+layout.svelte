<script lang="ts">
	import { page } from '$app/state';
  	let hideRootLayout = page.url.pathname.startsWith('/oauth')
		|| page.url.pathname.startsWith('/0playground');

  	import "../app.css";
	import "../global.css";

	let { children } = $props();

	// bye bye 😢
	// import { onNavigate } from '$app/navigation';
	// onNavigate((navigation) => {
	// 	if (!document.startViewTransition) return;
	// 	if (location.pathname === navigation.from?.url?.pathname) return;
	// 	return new Promise((resolve) => {
	// 		document.startViewTransition(async () => {
	// 			resolve();
	// 			// await navigation.complete;
	// 		});
	// 	});
	// });
	import ResizableNavbar from "../components/navbar/resizable_navbar.svelte";
	import BackgroundShaderNoise from "../components/bg/noise.svelte";
	import DesktopTitlebar from "../components/platform/desktop/titlebar.svelte";
  	import { isDesktop } from "$lib/platform.svelte";
  	import ScriptEntrypoint from "$lib/script_entrypoint.svelte";
	import ToastContainer from "../components/toast/toast_container.svelte";
  	import LoadingScreen from "../components/loading_screen.svelte";
  	import WindowProvider from '../components/window/provider.svelte';
  import Bg from '../components/bg/bg.svelte';
</script>
{#if hideRootLayout}
{@render children()}
{:else}
<ScriptEntrypoint/>
<WindowProvider/>
<LoadingScreen/>
<ToastContainer />
<div id="main_container" class="dark-picker relative flex flex-row h-screen w-screen max-h-screen max-w-screen">
	<ResizableNavbar/>
	<div class="grow h-full relative flex flex-col max-h-full">
		{#if isDesktop()}
			<DesktopTitlebar/>
		{/if}
        <div class="grow relative">
            <div class="w-full z-10 absolute top-0 bottom-0">
                <div class="main_content main_content_shadow overflow-clip">
                    <Bg/>
                    {@render children()}
                </div>
            </div>
        </div>
	</div>
</div>
{/if}
<style>
#main_container {
	background-color: var(--tinted-sec-100o);
}
</style>