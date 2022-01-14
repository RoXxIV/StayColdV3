import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/**
 * Importe et ajoute globalement les icone font-awesome
 * solid & free
 */
import {
  faSignOutAlt,
  faUserEdit,
  faUserTimes,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt, faUserEdit, faUserTimes, faArrowCircleRight);

export { FontAwesomeIcon };
