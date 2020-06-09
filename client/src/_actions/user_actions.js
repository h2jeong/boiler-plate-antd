import Axios from "axios";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const AUTH_USER = "AUTH_USER";

export function loginUser(dataToSubmit) {
  const request = Axios.post("/api/users/login", dataToSubmit).then(
    res => res.data
  );
  return { type: LOGIN_USER, payload: request };
}

export function registerUser(dataToSubmit) {
  const request = Axios.post("/api/users/register", dataToSubmit).then(
    res => res.data
  );
  return { type: REGISTER_USER, payload: request };
}

export function authUser() {
  const request = Axios.get("/api/users/auth").then(res => res.data);

  return { type: AUTH_USER, payload: request };
}
