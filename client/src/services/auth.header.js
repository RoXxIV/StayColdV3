export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  user && user.accessToken ? { "x-access-token": user.accessToken } : {};
}
