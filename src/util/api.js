const api = "https://europe-central2-hevoshieronta-info.cloudfunctions.net/api";
//const api = "http://localhost:5000/hevoshieronta-info/europe-central2/api";

export async function signinApiRequest(credentials, isNewUser = false) {
  const url = isNewUser ? `${api}/signup` : `${api}/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}

export function resetPasswordRequest(email) {
  const res = fetch(api + "/password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email: email}),
  });
}

export async function getTreatmentsApiRequest(role) {
  const url = role === "hoitaja" ? `${api}/treatments` : `${api}/treatments/owner`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}

export async function getTreatmentsByDateApiRequest(start, end) {
  const res = await fetch(api + "/treatments/by-date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
    body: JSON.stringify({start, end}),
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}

export async function postTreatmentApiRequest(formData) {
  const res = await fetch(`${api}/treatment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}

export async function updateTreatmentApiRequest(formData, id) {
  const res = await fetch(`${api}/treatment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return res.ok;
}

export async function updateAccountAuthApiRequest(credentials) {
  const res = await fetch(api + "/user/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}

export async function updateProfileInfoApiRequest(userInfo) {
  const res = await fetch(api + "/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
    body: JSON.stringify(userInfo),
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}

export async function getProfileDataApiRequest() {
  const res = await fetch(api + "/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.FBIdToken,
    },
  });
  const data = await res.json();
  if (!res.ok) throw {message: data.error, cause: res.status};
  return data;
}