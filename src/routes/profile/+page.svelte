<script lang="ts">
  import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabaseClient";
  import type { PageData } from "./$types";

  let { data }: { data: PageData} = $props();
</script>

<p>{data.user?.email} <i class="fa-regular fa-user"></i></p>
<form method="POST">
  <button type="submit" class="pure-button"
  >Sign Out</button>
</form>