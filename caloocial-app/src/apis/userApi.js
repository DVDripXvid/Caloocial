import config from "../config";
import axios from "axios";

const host = config.apiGateway + "/uaa";

export function getAccessToken(username, passwordHash) {
  return axios.post(
    host + "/oauth/token",
    {},
    {
      headers: { Authorization: "Basic YXBwOg==" },
      params: {
        username: username,
        password: passwordHash,
        scope: "ui",
        grant_type: "password"
      }
    }
  );
}

export function getPrincipal() {
  return axios.get(host + "/users/current");
}

export function refreshAccessToken(refreshToken) {
  return axios.post(
    host + "/oauth/token",
    {},
    {
      params: {
        refresh_token: refreshToken
      }
    }
  );
}

export function createUser(username, password) {
  axios.defaults.headers.common["Authorization"] = null;
  return axios.post(`${host}/users`, {
    username: username,
    password: password
  });
}
