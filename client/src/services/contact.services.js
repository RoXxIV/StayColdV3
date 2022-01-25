import axios from "axios";

axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

const API_URL = "http://localhost:5000/contact";

/**
 * Service Contact
 * @class
 */
class ContactService {
  /**
   * Recupere le contenu du formulaire pour le renvoyer sur
   * mon email personnel
   * @returns {object}
   */
  sendContactMail(contact) {
    return axios.post(API_URL, contact);
  }
}

export default new ContactService();
