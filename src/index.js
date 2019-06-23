import React from "react";
import ReactDOM from "react-dom";
import App from "@components/App";

import Vue from "vue";
import App2 from "@components/App/index.vue";

import "./index.css";

ReactDOM.render(<App />, document.getElementById("app"));

new Vue({
  el: "#app2",
  template: "<App2/>",
  components: { App2 }
});
