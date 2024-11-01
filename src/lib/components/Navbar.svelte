<script lang="ts">
  let { signedIn = false, email}: { signedIn: boolean, email: string } = $props();
</script>

<div class="pure-menu pure-menu-horizontal">
  <a href="/" class="pure-menu-heading pure-menu-link">Home <i class="fa-solid fa-home"></i></a>
  <ul class="pure-menu-list">
      <li class="pure-menu-item">
          <a href="/dreamlog" class="pure-menu-link">Dream Log <i class="fa-regular fa-calendar"></i></a>
      </li>
      {#if !signedIn}
      <li class="pure-menu-item">
          <a href="/login" class="pure-menu-link">Sign In <i class="fa-solid fa-right-to-bracket"></i></a>
      </li>
      {:else}
      <li class="pure-menu-item">
        <a href="/profile" class="pure-menu-link">Profile <i class="fa-regular fa-user"></i></a>
      </li>
      {/if}
  </ul>
</div>

<style>
  .pure-menu {
    text-align: center;
    background-color: var(--colour1);
    box-shadow: 5px 1px 5px var(--colour4);
  }
  .pure-menu-link {
    color: var(--colour5);
  }
  .pure-menu-link:hover {
    background-color: #2b2b2b;
  }

</style>