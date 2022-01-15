import { createWebHistory, createRouter } from "vue-router";
import authGuards from "./helper/auth.guards";
// views
import Home from "./views/Home.vue";
import Login from "./views/Auth/Login.vue";
import Register from "./views/Auth/Register.vue";
import ComfirmMail from "./views/Auth/ComfirmMail.vue";
import ResetPassword from "./views/Auth/ResetPassword.vue";
import SetNewPassword from "./views/Auth/SetNewPassword.vue";
import AddBath from "./views/User/AddBath.vue";
import EditBath from "./views/User/EditBath.vue";
import PageNotFound from "./views/PageNotFound.vue";
// boards view
import AdminBoard from "./views/Boards/AdminBoard.vue";

const routes = [
  {
    /** Page d'acceuil */
    path: "/",
    name: "Home",
    component: Home,
  },
  /** Page de connexion */
  {
    path: "/login",
    name: "Login",
    beforeEnter: authGuards.redirectUserGuard,
    component: Login,
  },
  /** Page d'inscription */
  {
    path: "/register",
    name: "Register",
    beforeEnter: authGuards.redirectUserGuard,
    component: Register,
  },
  /** page de comfirmation du compte utilisateur */
  {
    path: "/comfirm-mail-redirection/:confirmationCode",
    name: "Confirm-mail",
    beforeEnter: authGuards.redirectUserGuard,
    component: ComfirmMail,
  },
  /** Page de generation d'un nouveau mot de passe utilisateur */
  {
    path: "/reset-password/:confirmationCode",
    name: "Reset-password",
    component: ResetPassword,
  },
  /** Page de demande d'un nouveau mot de passe utilisateur */
  {
    path: "/set-new-password",
    name: "Set-new-password",
    component: SetNewPassword,
  },
  /** Formulaire d'ajout d'une baignade */
  {
    path: "/add-bath",
    name: "Add-bath",
    beforeEnter: authGuards.userGuard,
    component: AddBath,
  },
  /** Formulaire de modification d'une baignade */
  {
    path: "/edit-bath/:bathId",
    name: "Edit-bath",
    beforeEnter: authGuards.userGuard,
    component: EditBath,
  },
  /** Page board admin */
  {
    path: "/admin-board",
    name: "Admin-Board",
    beforeEnter: authGuards.isAdmin,
    component: AdminBoard,
  },
  /** Page 404 */
  {
    path: "/not-found",
    name: "Not-found",
    component: PageNotFound,
  },
  /** Redirige les routes incorecte sur la page 404 */
  { path: "/:pathMatch(.*)*", name: "Not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
