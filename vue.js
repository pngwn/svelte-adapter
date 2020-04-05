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

      let watchers = [];

      for (const key in this.$listeners) {
        this.comp.$on(key, this.$listeners[key]);
        const watchRe = /watch:([^]+)/;

        const watchMatch = key.match(watchRe);

        if (watchMatch && typeof this.$listeners[key] === "function") {
          watchers.push([
            `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
            this.$listeners[key]
          ]);
        }
      }

      if (watchers.length) {
        let comp = this.comp;
        const update = this.comp.$$.update;
        this.comp.$$.update = function() {
          watchers.forEach(([name, callback]) => {
            const index = comp.$$.props[name];
            callback(comp.$$.ctx[index]);
          });
          update.apply(null, arguments);
        };
      }
    },
    updated() {
      this.comp.$set(this.$attrs);
    },
    destroyed() {
      this.comp.$destroy();
    }
  });
