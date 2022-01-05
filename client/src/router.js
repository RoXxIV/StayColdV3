import { createWebHistory, createRouter } from "vue-router";
// views
import Home from "./views/Home.vue";
import Login from "./views/Auth/Login.vue";
import Register from "./views/Auth/Register.vue";
import ComfirmMail from "./views/Auth/ComfirmMail.vue";

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
  {
    path: "/inscription",
    name: "Register",
    component: Register,
  },
  {
    path: "/comfirmation-email-redirection/:confirmationCode?",
    name: "Confirm-mail",
    component: ComfirmMail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
