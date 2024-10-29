<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import "../global.css";
  import "purecss";
</script>

<Navbar />
<main>
  <slot />
</main>
<Footer />