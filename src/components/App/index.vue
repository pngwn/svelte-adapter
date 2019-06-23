<template>
  <div class="App">
    <button @click="show = !show">Show Cropper</button>
    <div class="data">
      <pre>{{ JSON.stringify(data, null, 2)}} </pre>
    </div>
    <Cropper
      v-if="show"
      @cropcomplete="updateData"
      @watch:zoom="updateZoom"
      :image="image"
      :zoom="zoom"
    />
    <div class="buttons" v-if="show">
      <button @click="show = !show">Close Cropper</button>
      <button @click="increaseZoom">Close Cropper</button>
      <button @click="decreaseZoom">Close Cropper</button>
    </div>
  </div>
</template>


<script>
import SvelteCropper from "svelte-easy-crop";
import toVue from "../../../vue";

const baseStyle = {
  width: "50%",
  background: "pink"
};

export default {
  components: {
    Cropper: toVue(SvelteCropper, baseStyle, "div")
  },
  data() {
    return {
      show: false,
      zoom: 1,
      image:
        "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2776&q=80",
      data: {}
    };
  },
  methods: {
    updateData({ detail }) {
      this.data = detail;
    },
    updateZoom(zoomLevel) {
      this.zoom = zoomLevel;
    },
    increaseZoom() {
      this.zoom = this.zoom >= 3 ? 3 : this.zoom + 1;
    },
    decreaseZoom() {
      this.zoom = this.zoom <= 1 ? 1 : this.zoom - 1;
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

.buttons {
  background: cadetblue;
  font-size: 16px;
  padding: 5px 10px;
  color: #fff;
  border: none;
  border-radius: 2px;
  margin: 0px 10px;
}
</style>