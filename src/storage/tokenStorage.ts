import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "access_token";
const WEB_TOKEN_KEY = "access_token_web";

export async function saveToken(token: string) {
  if (Platform.OS === "web") {
    sessionStorage.setItem(WEB_TOKEN_KEY, token);
    return;
  }

  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken() {
  if (Platform.OS === "web") {
    return sessionStorage.getItem(WEB_TOKEN_KEY);
  }

  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken() {
  if (Platform.OS === "web") {
    sessionStorage.removeItem(WEB_TOKEN_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(TOKEN_KEY);
}