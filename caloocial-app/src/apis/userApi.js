import config from "../config";
import axios from "axios";

const host = config.apiGateway + "/uaa";

export async function login(username, passwordHash) {
  return await axios.post(
    host + "/oauth/token",
    {},
    {
      headers: { Authorization: "Basic YnJvd3Nlcjo=" },
      params: {
        username: username,
        password: passwordHash,
        scope: "ui",
        grant_type: "password"
      }
    }
  );
}

export async function getPrincipal() {
  return await axios.get(host + "/users/current");
}

export async function refreshToken(refreshToken) {
  return await axios.post(
    host + "/oauth/token",
    {},
    {
      params: {
        refresh_token: refreshToken
      }
    }
  );
}
