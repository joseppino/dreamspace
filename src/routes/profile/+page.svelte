<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData} = $props();
</script>

<p>{data.user?.email} <i class="fa-regular fa-user"></i></p>