<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import "../global.css";
  import "purecss";
</script>

<Navbar />
<main>
  <slot />
</main>