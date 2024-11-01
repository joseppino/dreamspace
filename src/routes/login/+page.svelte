<script lang="ts">
  import toast from 'svelte-french-toast';
	import type { PageData, ActionData } from './$types';
  import { redirect } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

	let { data, form }: { data: PageData, form: ActionData } = $props();
  
  onMount(() => {
    if(data.user) {
      toast.success("Signed In! Redirecting...")
      setTimeout(() => {
        goto("/");
      }, 500);
    } 
  });

</script>

{#if !data.user}
<form method="POST" class="pure-form pure-form-stacked">
  <fieldset>
      <legend>Login</legend>
      <label for="stacked-email">Email</label>
      <input name="email" type="email" id="stacked-email" placeholder="Email" />
      <span class="pure-form-message">This is a required field.</span>
      <label for="stacked-password">Password</label>
      <input name="password" type="password" id="stacked-password" placeholder="Password" />
      <label for="stacked-remember" class="pure-checkbox">
          <input type="checkbox" id="stacked-remember" /> Remember me
      </label>
      <div class="loginbtn">
        <button type="submit" class="pure-button pure-button-primary">Sign in</button>
      </div>
      <p>New user? <a href="/register">Register here</a></p>
  </fieldset>
</form>
{:else}
<p>Signed in as {data.user.email}</p>
{/if}

<style>
  legend {
    color: var(--colour5) !important;
    text-align: center;
    margin-top: 5px;
  }

  .loginbtn {
    text-align: center;
    margin-top: 10px;
  }
</style>