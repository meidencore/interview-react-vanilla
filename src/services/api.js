const API_URL = "http://localhost:5290/api";

export function post(path, data) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function get(path) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: localStorage.getItem("Authorization") },
  });

  return response.json();
}

export async function put(path, data) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(path) {
  return fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
    method: "DELETE",
  });
}
