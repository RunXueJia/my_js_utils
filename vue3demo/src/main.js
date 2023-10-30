import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue from "vue";
import utils from "../../myUtils";
// import '../../vscode'
const app = createApp(App);
app.provide('$utils', utils)
app.config.globalProperties.utils = utils;
app.use(router);
app.mount("#app");
