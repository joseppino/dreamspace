<script lang="ts">
  let { signedIn = false, email}: { signedIn: boolean, email: string } = $props();
</script>

<header class="pure-menu pure-menu-horizontal">
  <a href="/" class="pure-menu-heading pure-menu-link">Home <i class="fa-solid fa-home"></i></a>
  <ul class="pure-menu-list">
    {#if signedIn}
    <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
      <a href="/dreams" id="dreams" class="pure-menu-link">Dreams <i class="fa-solid fa-cloud"></i></a>
      <ul class="pure-menu-children">
        <li class="pure-menu-item">
          <a href="/dreamlog" class="pure-menu-link">Dream Log <i class="fa-regular fa-calendar"></i></a>
        </li>
        <li class="pure-menu-item">
          <a href="/add-dream" class="pure-menu-link">Add dream <i class="fa-solid fa-pencil"></i></a>
        </li>
      </ul>
    </li>
    {/if}
    {#if !signedIn}
    <li class="pure-menu-item">
      <a href="/login" class="pure-menu-link">Sign In <i class="fa-solid fa-right-to-bracket"></i></a>
    </li>
    {:else}
    <li class="pure-menu-item">
      <a href="/profile" class="pure-menu-link">Profile <i class="fa-solid fa-user"></i></a>
    </li>
    {/if}
  </ul>
</header>

<style>
  header {
    flex-shrink: 0;
  }

  .pure-menu {
    text-align: center;
    background-color: var(--colour1);
    box-shadow: 5px 1px 5px var(--colour4);
  }
  .pure-menu-link {
    color: var(--colour5);
    background-color: var(--colour1);
  }
  .pure-menu-link:hover {
    background-color: #2b2b2b;
  }

</style>