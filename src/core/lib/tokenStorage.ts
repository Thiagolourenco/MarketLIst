/* eslint-disable @typescript-eslint/no-require-imports */

// Minimal JWT storage helper.
// Uses AsyncStorage when available; otherwise becomes a no-op (app still runs).

type AsyncStorageLike = {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
};

const JWT_KEY = "auth.jwt";

let storage: AsyncStorageLike | undefined;
try {
  storage = require("@react-native-async-storage/async-storage")?.default;
} catch {
  storage = undefined;
}

export async function saveJwt(jwt: string) {
  if (!storage) return;
  await storage.setItem(JWT_KEY, jwt);
}

export async function getJwt() {
  if (!storage) return null;
  return storage.getItem(JWT_KEY);
}

export async function clearJwt() {
  if (!storage) return;
  await storage.removeItem(JWT_KEY);
}
