<script lang="ts">
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";

  let { mode = "edit", formFields = null, wasLastNight = $bindable(false) }: { mode: string, formFields: any, wasLastNight: boolean } = $props();

  let wasDaydream: boolean = $state(false);
  let dreamTitle: string = $state("");
  let dreamDescription: string = $state("");
  let dateInput: HTMLInputElement;
  let sentimentScore: string = $state("0");


  function populateEditFields() {
    switch(formFields.sentiment) {
      case "bad":
        sentimentScore = "-1";
        break;
      case "good":
        sentimentScore = "1";
        break;
      default:
        sentimentScore = "0";
        break;
    }
    
    if(formFields.type === "day-dream") {
      wasDaydream = true;
    }

    if(formFields.date_of_dream) {
      dateInput.value = formFields.date_of_dream;
    }

    if(formFields.title) {
      dreamTitle = formFields.title;
    }

    if(formFields.description) {
      dreamDescription = formFields.description;
    }

  }

  $effect(() => {
    if(wasLastNight) {
      setDateToDefaultAndDisable();
    } else {
      enableDateInput();
      if(mode !== "edit") {
        let date = new Date(); // today's date
        const newDateString = date.toISOString().substring(0, 10);
        dateInput.value = newDateString;
      } 
      
    }
    if(wasDaydream) {
      wasLastNight = false;
    }
  });

  onMount(() => {    
    if(mode === "edit" && formFields) {
      populateEditFields();    
    } else {
      wasLastNight = true;
      setDateToDefaultAndDisable();
    }
  });

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

<label for="checkbox-radio-option-one" class="pure-checkbox">
  <input name="daydream-check" type="checkbox" id="checkbox-radio-option-one" bind:checked={wasDaydream} /> A daydream 💭 
</label>
<div class="sentiment-wrap">
<span style="margin-left: 0px;">Bad 👎</span>
<input type="range" name="sentiment-score" id="sentiment-range" min="-1" max="1" step="1" bind:value={sentimentScore}>
<span>Good 👍</span>
</div>
<fieldset class="pure-group">
  <input class="fullwidth-input" name="date-of-dream" type="date"
  bind:this={dateInput}
  onchange={checkDateValidity}>
  <input type="text" name="title" class="pure-input-1-2 fullwidth-input" placeholder="Title goes here..." maxlength="150" bind:value={dreamTitle}/>
  <textarea class="pure-input-1-2 fullwidth-input" name="description" placeholder="Describe your dream here..." maxlength="5000" bind:value={dreamDescription}></textarea>
</fieldset>

<style>
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
</style>