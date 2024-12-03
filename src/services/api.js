export function post(path, data) {
  return fetch(`http://localhost:5290/api${path}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
}
