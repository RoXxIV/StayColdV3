import { createWebHistory, createRouter } from "vue-router";
// views
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/connexion",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
