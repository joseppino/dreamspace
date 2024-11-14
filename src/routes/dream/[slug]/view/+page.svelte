<script lang="ts">
  import toast from 'svelte-french-toast';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData, form: ActionData } = $props();
  
  if(form?.success === false) {
    toast.error("Error deleting dream log entry...");
  }

  let deleteClicks: number = $state(0);

  function handleDeleteClick() {
    deleteClicks += 1;
    setTimeout(() => {
      deleteClicks = 0;
    }, 2000);
  }

</script>

<h1>{data.title}</h1>
<div class="pure-button-group" role="group" aria-label="dream controls">
  <form method="POST" action="?/edit" style="display:contents;">
    <button class="pure-button">Edit <i class="fa-solid fa-pen-to-square"></i></button>
  </form>
  <button class="pure-button pure-button-active">Share <i class="fa-solid fa-share-from-square"></i></button>
  {#if deleteClicks >= 1}
  <form method="POST" action="?/delete" style="display:contents;">
    <button class="pure-button delete-btn" style="background-color: rgb(202, 60, 60);">Really? <i class="fa-solid fa-trash-can"></i></button>
    <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={data.uuid}>
  </form>
  {:else }
  <button class="pure-button delete-btn" onclick={handleDeleteClick}>Delete <i class="fa-solid fa-trash-can"></i></button>
  {/if}
</div>
<div>{data.description}</div>

<style>
  .delete-btn {
    width: 105px;
    border-top-right-radius: 2px !important;
    border-bottom-right-radius: 2px !important;
  }
</style>