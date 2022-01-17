import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import titleMixin from "./helper/titleMixin";
import { FontAwesomeIcon } from "./plugin/font-awesome";
import "./assets/styles/_variables.scss";
import "./assets/styles/_mixin.scss";
import "./assets/styles/_global.scss";

createApp(App)
  .use(router)
  .use(store)
  .mixin(titleMixin)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
