<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let dreams: any[] = $state([]);
  if(data.dreams) dreams = data.dreams;
  $inspect(dreams);

  let sortValue: string = $state("Sort ↕");

  function sortDreamlog(sortType: string) {
    switch (sortType) {
      case "date-asc":
        //@ts-ignore
        dreams = dreams.sort((a, b) => new Date(a.date_of_dream) - new Date(b.date_of_dream));
        break;
      case "mod-desc":
        //@ts-ignore
        dreams = dreams.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
      // default sort is date-desc
      default:
        //@ts-ignore
        dreams = dreams.sort((a, b) => new Date(b.date_of_dream) - new Date(a.date_of_dream));
        break;
    }
  }

  let deleteClicks: number = $state(0);

  function handleDeleteClick() {
    deleteClicks += 1;
    setTimeout(() => {
      deleteClicks = 0;
    }, 2000);
  }
  
</script>

<div class="dreamlog-wrapper">
  <div class="dreamlog-header">
    <h2>Dream Log</h2>
    <form class="pure-form">
      <select id="sort-control" bind:value={sortValue} onchange={() => sortDreamlog(sortValue)}>
          <option selected disabled>Sort ↕</option>
          <option value="date-desc">Date ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="mod-desc">Modified ↓</option>
      </select>
    </form>
  </div>
  {#each dreams as dream}
  <div class="dream-header">
    <span class="dream-title">{dream.title}</span>
    <span>{dream.type === "day-dream" ? 'Daydream 💭' : 'Dream 🌙'} {new Date(dream.date_of_dream).toLocaleDateString()}</span>
    <div class="pure-button-group" role="group" aria-label="...">
      <form method="POST" action="?/view" style="display:contents;">
        <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={dream.uuid}>
        <button class="pure-button view ctrl-btn" aria-label="edit"><i class="fa-solid fa-up-right-from-square"></i></button>
      </form>
      <form method="POST" action="?/edit" style="display:contents;">
        <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={dream.uuid}>
        <button class="pure-button edit ctrl-btn" aria-label="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      </form>
      {#if deleteClicks >= 1}
      <form method="POST" action="?/delete" style="display:contents;">
        <input type="hidden" name="dreamid-hidden" id="dreamid-hidden" value={dream.uuid}>
        <button class="pure-button edit ctrl-btn" aria-label="edit" style="background-color: rgb(202, 60, 60);"><i class="fa-solid fa-trash-can"></i></button>
      </form>
      {:else}
      <button class="pure-button edit ctrl-btn" aria-label="edit" onclick={handleDeleteClick}><i class="fa-solid fa-trash-can"></i></button>
      {/if}
    </div>
  </div>
    {#each dream.description.split('\n') as paragraph}
    <p>{paragraph}</p>
    <!-- <textarea name="" id="">{dream.description}</textarea> -->
    {/each}
    <hr>
  {:else}
  <p>No dreams logged to date... why not start <a href="/add-dream">here</a></p>
  {/each}
</div>

<style>
  .dreamlog-wrapper {
    max-width: 800px;
    min-width: 350px;
  }

  .dreamlog-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .dream-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dream-title {
    font-size: large;
    font-weight: bold;
  }

  .ctrl-btn {
    padding: .25em .5em !important;
  }

  .view {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    /* margin-right: 1px; */
  }
</style>