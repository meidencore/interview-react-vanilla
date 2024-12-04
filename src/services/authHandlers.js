import { post } from "./api";

const LOGIN_ENDPOINT = "/login/Authorize";

export async function handleLogin(formData) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const credentials = {
    password: formData.get("password"),
  };

  const usernameOrEmail = formData.get("usernameoremail");
  emailRegex.test(usernameOrEmail)
    ? (credentials.email = usernameOrEmail)
    : (credentials.name = usernameOrEmail);

  try {
    const login = await post(LOGIN_ENDPOINT, credentials);
    if (login.ok) {
      const token = await login.text();
      localStorage.setItem("Authorization", `Bearer ${token}`);

      return { ok: true };
    } else {
      return {
        ok: false,
        status: login.status,
        description: login.statusText,
      };
    }
  } catch (error) {
    return {
      ok: false,
      description: error.message,
    };
  }
}

export function handleLogout() {
  localStorage.removeItem("Authorization");
}
