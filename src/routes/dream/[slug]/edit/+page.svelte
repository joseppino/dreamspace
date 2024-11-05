<script lang="ts">
	import { read } from '$app/server';
import type { ActionData, PageData } from './$types';

	let { data }: { data: PageData, form: ActionData } = $props();

  let deleteClicks: number = $state(0);

  function handleDeleteClick() {
    deleteClicks += 1;
    setTimeout(() => {
      deleteClicks = 0;
    }, 2000);
  }

</script>

<h1>Edit</h1>
<div class="pure-button-group" role="group" aria-label="...">
  <form method="POST" action="?/edit" style="display:contents;">
    <button class="pure-button">Edit <i class="fa-solid fa-pen-to-square"></i></button>
  </form>
  {#if deleteClicks >= 1}
  <form method="POST" action="?/delete" style="display:contents;">
    <button class="pure-button" style="background-color: rgb(202, 60, 60);">Really? <i class="fa-solid fa-trash"></i></button>
    <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={data.uuid}>
  </form>
  {:else }
  <button class="pure-button" onclick={handleDeleteClick}>Delete <i class="fa-solid fa-trash"></i></button>
  {/if}
</div>
<form action="?/commit" class="pure-form">
  <fieldset class="pure-group">
    <input class="fullwidth-input" name="date-of-dream" type="date" readonly>
    <input type="text" name="title" class="pure-input-1-2 fullwidth-input" placeholder="Title goes here..." maxlength="150" />
    <textarea class="pure-input-1-2 fullwidth-input" name="description" placeholder="Describe your dream here..." maxlength="5000"></textarea>
  </fieldset>
  <div class="submit-btn-wrap">
    <button type="submit" class="pure-button pure-input-1-2 pure-button-primary">Submit</button>
  </div>
</form>