import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// styles
import "./assets/styles/global.scss";
import "./assets/styles/app.scss";

createApp(App).use(router).use(store).mount("#app");
