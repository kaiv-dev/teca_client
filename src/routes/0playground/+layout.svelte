<script lang="ts">
  import Provider from '$lib/../components/window/provider.svelte';

	let { children } = $props();
</script>
<Provider/>
{@render children()}
