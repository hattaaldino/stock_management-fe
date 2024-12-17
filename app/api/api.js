const API_BASE_URL = 'http://127.0.0.1:7000';

export async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  return response.json();
}

export async function postData(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
