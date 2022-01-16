class RenderBathDataService {
  /**
   * Remplace les "data" afin d'afficher la meteo sous forme d'emoji
   * @param {string} data
   * @returns {string}
   */
  displayWeatherAsEmoji(data) {
    switch (data) {
      case "partiellement nuageux":
        return "cloudy-day-3";
      case "nuageux":
        return "cloudy";
      case "ensoleillé":
        return "day";
      case "pluie":
        return "rainy-5";
      case "neige":
        return "snowy-6";
      case "tempête":
        return "thunder";

      default:
        return "meteo non indiqué*";
    }
  }
  /**
   * Retourne la date au format 30/10/1990
   * @param {string} date
   * @returns {string}
   */
  editDateFormat(date) {
    return date.substring(0, 10).split("-").reverse().join("/");
  }
}

export default new RenderBathDataService();
