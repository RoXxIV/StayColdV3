import { createWebHistory, createRouter } from "vue-router";
// views
import Home from "./views/Home.vue";
import Login from "./views/Auth/Login.vue";
import Register from "./views/Auth/Register.vue";
import ComfirmMail from "./views/Auth/ComfirmMail.vue";
import PageNotFound from "./views/PageNotFound.vue";
// boards view
import AdminBoard from "./views/Boards/AdminBoard.vue";

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
    path: "/comfirmation-email-redirection/:confirmationCode",
    name: "Confirm-mail",
    component: ComfirmMail,
  },
  // Boards
  {
    path: "/admin-board",
    name: "Admin-Board",
    component: AdminBoard,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
