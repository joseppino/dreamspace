<script lang="ts">
  import type { PageData } from './$types';
	import { Datepicker, themes } from 'svelte-calendar';
	const { dark: theme } = themes;


  let { data }: { data: PageData } = $props();
</script>

<!-- <Datepicker {theme}/> -->
 <input type="date" name="" id="">
