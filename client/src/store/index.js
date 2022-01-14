import { createStore } from "vuex";
import { auth } from "./auth.module";

/**
 * export des differents stores
 */
const store = createStore({
  modules: {
    auth,
  },
});

export default store;
