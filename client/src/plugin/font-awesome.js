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
  faSwimmingPool,
  faTemperatureHigh,
  faCloudSunRain,
  faStopwatch,
  faWind,
  faHourglassHalf,
  faWaveSquare,
  faQuestionCircle,
  faGrinStars,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSignOutAlt,
  faUserEdit,
  faUserTimes,
  faArrowCircleRight,
  faSwimmingPool,
  faTemperatureHigh,
  faCloudSunRain,
  faStopwatch,
  faWind,
  faHourglassHalf,
  faWaveSquare,
  faQuestionCircle,
  faGrinStars,
  faPencilAlt
);

export { FontAwesomeIcon };
