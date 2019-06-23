import Vue from "vue";

export default (Component, style = {}, tag = "span") =>
  Vue.component("vue-svelte-adaptor", {
    render(createElement) {
      return createElement(tag, {
        ref: "container",
        props: this.$attrs,
        style
      });
    },
    data() {
      return {
        comp: null
      };
    },
    mounted() {
      this.comp = new Component({
        target: this.$refs.container,
        props: this.$attrs
      });

      for (const key in this.$listeners) {
        this.comp.$on(key, this.$listeners[key]);
      }
    },
    updated() {
      this.comp.$set(this.$attrs);
    }
  });
