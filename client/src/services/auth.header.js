/**
 * Verifie la presence d'un utilisateur dans le local storage
 * S'il existe un utilisateur connecté avec un accessToken (JWT),
 * il renvoie l'en-tête HTTP Authorization. Sinon, elle renvoie un objet vide.
 * @returns {object}
 */
export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
