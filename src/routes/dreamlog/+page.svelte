<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let dreams: any[] = $state([]);
  if(data.dreams) dreams = data.dreams;
  $inspect(dreams);

  let sortValue: string = $state("Sort");

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
  
</script>

<div class="dreamlog-wrapper">
  <div class="dreamlog-header">
    <h2>Dream Log</h2>
    <form class="pure-form">
      <select id="sort-control" bind:value={sortValue} onchange={() => sortDreamlog(sortValue)}>
          <option selected disabled>Sort</option>
          <option value="date-desc">Date ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="mod-desc">Modified ↓</option>
      </select>
    </form>
  </div>
  {#each dreams as dream}
  <div class="dream-header">
    <span class="dream-title">{dream.title}</span>
    <span>Night of {new Date(dream.date_of_dream).toLocaleDateString()}</span>
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
</style>