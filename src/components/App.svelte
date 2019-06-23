<script>
  import { createEventDispatcher } from "svelte";
  export let number = 0;

  const dispatch = createEventDispatcher();
</script>

<style>
  button {
    padding: 3px 5px;
    font-size: 16px;
    border-radius: 2px;
    background-color: tomato;
    color: white;
    border: none;
  }
</style>

<div>
  <h1>I am a Svelte component</h1>
  <h2>{number}</h2>
  <button on:click>Click to fire an event</button>
</div>
