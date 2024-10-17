import axios from './axios';

const API = "http://localhost:9090/api";

export const registerRequest = user => axios.post("/auth/nuevo", user);
export const loginRequest = user => axios.post("/auth/login", user);
// export const logoutRequest= axios.post(`${API}/`)

export const verifyTokenRequest = token => axios.post("/auth/verify-token", {token});
