import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  PUSH_TOKEN_KEY,
} from "@/shared/constants";

import { Preferences } from "@capacitor/preferences";

const TokenService = {
  async getToken() {
    // @ts-ignore
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    return value;
    // return localStorage.getItem(TOKEN_KEY);
  },

  async saveToken(accessToken: string) {
    await Preferences.set({
      key: TOKEN_KEY,
      value: accessToken,
    });
    // localStorage.setItem(TOKEN_KEY, accessToken);
  },

  async savePushToken(accessToken: string) {
    await Preferences.set({
      key: PUSH_TOKEN_KEY,
      value: accessToken,
    });
    localStorage.setItem(PUSH_TOKEN_KEY, accessToken);
  },

  async removeToken() {
    await Preferences.remove({ key: TOKEN_KEY });
    // localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export { TokenService };
