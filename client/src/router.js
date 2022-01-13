import { createWebHistory, createRouter } from "vue-router";
import authGuards from "./helper/auth.guards";
// views
import Home from "./views/Home.vue";
import Login from "./views/Auth/Login.vue";
import Register from "./views/Auth/Register.vue";
import ComfirmMail from "./views/Auth/ComfirmMail.vue";
import ResetPassword from "./views/Auth/ResetPassword.vue";
import SetNewPassword from "./views/Auth/SetNewPassword.vue";
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
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/comfirm-mail-redirection/:confirmationCode",
    name: "Confirm-mail",
    component: ComfirmMail,
  },
  {
    path: "/reset-password/:confirmationCode",
    name: "Reset-password",
    component: ResetPassword,
  },
  {
    path: "/set-new-password",
    name: "Set-new-password",
    component: SetNewPassword,
  },
  // Boards
  {
    path: "/admin-board",
    name: "Admin-Board",
    beforeEnter: authGuards.isAdmin,
    component: AdminBoard,
  },
  // 404
  {
    path: "/not-found",
    name: "not-found",
    component: PageNotFound,
  },
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
