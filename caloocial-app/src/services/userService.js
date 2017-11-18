import {
  getAccessToken,
  getPrincipal,
  refreshAccessToken
} from "../apis/userApi";

import { getPersonByUserId } from "../apis/groupApi";

import { AsyncStorage } from "react-native";
import config from "../config";
import axios from "axios";

var refreshTimeoutId;

export function login(username, password) {
  return getAccessToken(username, password)
    .then(resp => {
      if (resp.status === 200) {
        updateCredentials(
          resp.data.access_token,
          resp.data.refresh_token
        );
        refreshTimeoutId = setTimeout(
          getNewAccesToken,
          resp.data.expires_in * 900
        );
      }
      return resp;
    })
    .catch(e => console.error(e));
}

async function getNewAccesToken() {
  try {
    let refreshToken = await AsyncStorage.getItem(config.store.refreshTokenKey);
    let resp = await refreshAccessToken(refreshToken);
    if (resp.status === 200) {
      await updateCredentials(
        resp.data.access_token,
        resp.data.refresh_token
      );
      refreshTimeoutId = setTimeout(
        getNewAccesToken,
        resp.data.expires_in * 900
      );
    }
  } catch (e) {
    console.error(e);
  }
}

async function updateCredentials(accesToken, refreshToken) {
  try {
    axios.defaults.headers.common["Authorization"] = "Bearer " + accesToken;

    await AsyncStorage.setItem(config.store.accessTokenKey, accesToken);
    await AsyncStorage.setItem(config.store.refreshTokenKey, refreshToken);

    await refreshPrincipal(accesToken);
  } catch (e) {
    console.error(e);
  }
}

async function refreshPrincipal(token) {
  try {
    let resp = await getPrincipal();
    if (resp.status === 200) {
      await AsyncStorage.setItem(
        config.store.principalKey,
        JSON.stringify(resp.data.principal)
      );
      let person = await getPersonByUserId(resp.data.principal.id);
      await AsyncStorage.setItem(
        config.store.personKey,
        JSON.stringify(person)
      );
    }
  } catch (error) {
    console.error(error);
  }
}
