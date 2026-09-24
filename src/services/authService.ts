const BASE_URL = "https://dummyjson.com";

export async function loginUser(
  username: string,
  password: string
) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

export async function getCurrentUser(token: string) {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Session expired");
  }

  return await response.json();
}