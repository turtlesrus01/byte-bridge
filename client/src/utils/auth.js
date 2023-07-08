import decode from "jwt-decode";

class AuthService {
  getProfile() {
    try {
      return decode(this.getToken());
    } catch (err) {
      console.error("error decoding token", err);
      //Returns null in case of an error
      return null;
    }
  }

  loggedIn() {
    try {
      const token = this.getToken();
      return token && !this.isTokenExpired(token) ? true : false;
    } catch (err) {
      console.error("error checking login status", err);
      return false;
    }
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("id_token");
        return true;
      }
      return false;
    } catch (err) {
      console.error("error decoding token", err);
      //return true to force token expiration
      return true;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

const authService = new AuthService();
export default authService;