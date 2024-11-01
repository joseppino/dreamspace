<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { type Snippet } from "svelte";
  import "../global.css";
  import "purecss";
  import type { LayoutData } from "./$types";
  import { Toaster } from "svelte-french-toast";

  let { data, children }: { data: LayoutData, children: Snippet } = $props();

  let signedIn: boolean = $state(false);
  let email: string = $state("");
  if (data.user) {
    signedIn = true;
    email = data.user.email || "";
  }
</script>

<Toaster />
<Navbar {signedIn} {email}/>
<main>
  {@render children()}
</main>
<Footer />