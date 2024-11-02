<script lang="ts">
  import type { PageData } from './$types';
	import { Datepicker, themes } from 'svelte-calendar';
	const { dark: theme } = themes;


  let { data }: { data: PageData } = $props();
  let dreams: any[] = $state([]);
  if(data.dreams) dreams = data.dreams;
  $inspect(dreams);
  
  
</script>

<!-- <Datepicker {theme}/> -->
<!-- <input type="date" name="" id=""> -->
<h2>Dream Log</h2>
{#each dreams as dream}
  <div class="dream-header">
    <span class="dream-title">{dream.title}</span>
    <span>Night of {new Date(dream.created_at).toLocaleDateString()}</span>
  </div>
  <p>{dream.description}</p>
{/each}

<style>
  .dream-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dream-title {
    font-size: large;
    font-weight: bold;
  }
</style>