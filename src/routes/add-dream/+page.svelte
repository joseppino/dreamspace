<script lang="ts">
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import type { ActionData } from "./$types";
  import { goto } from "$app/navigation";

  let { form }: { form: ActionData } = $props();
  if(form?.success) {
    toast.success("Dream added successfully.");
  } else if(form?.success === false) {
    toast.error(`Error logging dream: ${form?.message}`);
  }

  let wasLastNight: boolean = $state(true);
  let wasDaydream: boolean = $state(false);
  let dateInput: HTMLInputElement;

  $effect(() => {
    if(wasLastNight) {
      setDateToDefaultAndDisable();
    } else {
      enableDateInput();
      let date = new Date(); // today's date
      const newDateString = date.toISOString().substring(0, 10);
      dateInput.value = newDateString;
    }
    if(wasDaydream) {
      wasLastNight = false;
    }
  });

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

  function checkDateValidity() {
    const today = new Date(); // today's date
    const inputDate = new Date(dateInput.value);
    if(inputDate > today) {
      toast.error("Date cannot be in the future.", { position: "bottom-center" });
      dateInput.value = today.toISOString().substring(0, 10);
    }
    //@ts-ignore
    const diffTime = Math.abs(today - inputDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays && diffDays >= 30) {
      toast.error("Cannot log dreams older than one month.", { position: "bottom-center", duration: 5000 });
      dateInput.value = today.toISOString().substring(0, 10);
    }
  }
</script>

<h2>Describe a new dream...</h2>
<form class="pure-form" method="POST">
  <p>The dream was...</p>
  {#if !wasDaydream}
  <label for="checkbox-radio-option-one1" class="pure-checkbox">
    <input type="checkbox" id="checkbox-radio-option-one1" bind:checked={wasLastNight}/> Last night 🌙
  </label>
  {/if}
  {#if !wasLastNight}
  <label for="checkbox-radio-option-one" class="pure-checkbox">
    <input name="daydream-check" type="checkbox" id="checkbox-radio-option-one" bind:checked={wasDaydream} /> A daydream 💭 
  </label>
  {/if}
  <div class="sentiment-wrap">
  <span style="margin-left: 0px;">Bad 👎</span>
  <input type="range" name="sentiment-score" id="sentiment-range" min="-1" max="1" step="1">
  <span>Good 👍</span>
  </div>
  <fieldset class="pure-group">
    <input class="fullwidth-input" name="date-of-dream" type="date"
    bind:this={dateInput}
    onchange={checkDateValidity}>
    <input type="text" name="title" class="pure-input-1-2 fullwidth-input" placeholder="Title goes here..." maxlength="150" />
    <textarea class="pure-input-1-2 fullwidth-input" name="description" placeholder="Describe your dream here..." maxlength="5000"></textarea>
  </fieldset>
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

  fieldset {
    width: 100%;
  }

  .sentiment-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .sentiment-wrap span {
    margin: 0px 5px;
  }

  textarea {
    min-height: 200px;
    font-size: 90%;
  }

  .fullwidth-input {
    width: 100% !important;
  }

  .submit-btn-wrap {
    text-align: center;
  }
</style>