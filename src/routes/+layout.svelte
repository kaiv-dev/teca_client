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
  	import Resizable from '../components/containers/resizable.svelte';
</script>
{#if hideRootLayout}
{@render children()}
{:else}
<ScriptEntrypoint/>
<WindowProvider/>
<LoadingScreen/>
<ToastContainer />
<div id="main_container" class="relative flex flex-row h-screen w-screen">
	<!-- <div class="h-full" style="flex-basis: 200px"></div> -->
	<ResizableNavbar/>
	<div class="grow h-full relative flex flex-col">
		{#if isDesktop()}
			<DesktopTitlebar/>
		{/if}
		<div class="w-full h-full relative z-10 grow">
			{@render children()}
		</div>
	</div>
</div>
{/if}
<style>
#main_container {
	background-color: var(--tinted-sec-100o);
}


</style>