<script lang="ts">
	import { read } from '$app/server';
  import DreamEditor from '$lib/components/DreamEditor.svelte';
  import toast from 'svelte-french-toast';
  import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
  if(form?.success) {
    toast.success("Saved edits successfully!");
  }

  let deleteClicks: number = $state(0);

  function handleDeleteClick() {
    deleteClicks += 1;
    setTimeout(() => {
      deleteClicks = 0;
    }, 2000);
  }

</script>

<h1>Edit</h1>
  {#if deleteClicks >= 1}
  <form method="POST" action="?/delete" style="display:contents;">
    <button class="pure-button" style="background-color: rgb(202, 60, 60);">Really? <i class="fa-solid fa-trash-can"></i></button>
    <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={data.uuid}>
  </form>
  {:else }
  <button class="pure-button" onclick={handleDeleteClick}>Delete <i class="fa-solid fa-trash-can"></i></button>
  {/if}
<form method="POST" action="?/commit" class="pure-form">
  <p>The dream was...</p>
  <DreamEditor mode="edit" formFields={data} wasLastNight={false}/> 
  <div class="submit-btn-wrap">
    <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={data.uuid}>
    <button type="submit" class="pure-button pure-input-1-2 pure-button-primary">Save Edits</button>
  </div>
</form>

<style>
  form {
    min-width: 350px;
    max-width: 90vw;
    width: 600px;
  }

  .submit-btn-wrap {
    text-align: center;
  }
</style>