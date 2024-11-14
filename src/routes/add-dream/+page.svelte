<script lang="ts">
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import type { ActionData } from "./$types";
  import DreamEditor from "$lib/components/DreamEditor.svelte";

  let { form }: { form: ActionData } = $props();
  if(form?.success) {
    toast.success("Dream added successfully.");
  } else if(form?.success === false) {
    toast.error(`Error logging dream: ${form?.message}`);
  }

  let wasLastNight: boolean = $state(true);
  let wasDaydream: boolean = $state(false);
  let dateInput: HTMLInputElement;

  // $effect(() => {
  //   if(wasLastNight) {
  //     setDateToDefaultAndDisable();
  //   } else {
  //     enableDateInput();
  //     let date = new Date(); // today's date
  //     const newDateString = date.toISOString().substring(0, 10);
  //     dateInput.value = newDateString;
  //   }
  //   if(wasDaydream) {
  //     wasLastNight = false;
  //   }
  // });

  onMount(() => setDateToDefaultAndDisable());

  function setDateToDefaultAndDisable() {
    if(dateInput) {
      let date = new Date(); // today's date
      date.setDate(date.getDate() - 1); // yesterday's date
      const newDateString = date.toISOString().substring(0, 10);
      dateInput.value = newDateString;
      dateInput.readOnly = true;
    }
  }

  function enableDateInput() {
    if(dateInput) {
      dateInput.readOnly = false;
    }
  }

  // function checkDateValidity() {
  //   const today = new Date(); // today's date
  //   const inputDate = new Date(dateInput.value);
  //   if(inputDate > today) {
  //     toast.error("Date cannot be in the future.", { position: "bottom-center" });
  //     dateInput.value = today.toISOString().substring(0, 10);
  //   }
  //   //@ts-ignore
  //   const diffTime = Math.abs(today - inputDate);
  //   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //   if(diffDays && diffDays >= 30) {
  //     toast.error("Cannot log dreams older than one month.", { position: "bottom-center", duration: 5000 });
  //     dateInput.value = today.toISOString().substring(0, 10);
  //   }
  // }
</script>

<h2>Describe a new dream...</h2>
<form class="pure-form" method="POST">
  <p>The dream was...</p>
  {#if !wasDaydream}
  <label for="checkbox-radio-option-one1" class="pure-checkbox">
    <input type="checkbox" id="checkbox-radio-option-one1" bind:checked={wasLastNight}/> Last night 🌙
  </label>
  {/if}
  <DreamEditor mode="new" formFields={null} bind:wasLastNight/> 
  <div class="submit-btn-wrap">
    <button type="submit" class="pure-button pure-input-1-2 pure-button-primary">Submit</button>
  </div>
</form>

<style>
  form {
    min-width: 350px;
    max-width: 90vw;
    width: 600px;
  }

  .submit-btn-wrap {
    text-align: center;
  }
</style>