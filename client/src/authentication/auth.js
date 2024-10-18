import axios from './axios';

const API = "http://localhost:9090/api";

export const registerRequest = user => axios.post("api/auth/nuevo", user);
export const loginRequest = user => axios.post("api/auth/login", user);
// export const logoutRequest= axios.post(`${API}/`)

export const profileRequest = token => axios.get("api/auth/profile", {token});

export const verifyTokenRequest = token => axios.post("api/auth/verify-token", {token});
