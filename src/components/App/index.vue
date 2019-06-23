<template>
  <div>
    <h1>I am a Vue component</h1>
    <button @click="handleClick">Increment - {{count}}</button>
    <SvelteInVue :number="count" @click="handleClick"/>
  </div>
</template>


<script>
import SvelteApp from "../App.svelte";
import toVue from "../../../vue";

const baseStyle = {
  width: "50%",
  background: "pink"
};

export default {
  components: {
    SvelteInVue: toVue(SvelteApp, baseStyle, "div")
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    handleClick() {
      this.count += 1;
    }
  }
};
</script>


<style scoped>
button {
  padding: 3px 5px;
  font-size: 16px;
  border-radius: 2px;
  background-color: cadetblue;
  color: white;
  border: none;
}
</style>