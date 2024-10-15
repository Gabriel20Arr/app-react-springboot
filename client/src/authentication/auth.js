import axios from 'axios';

//  http://localhost:9090/api/auth/nuevo
const API = "http://localhost:9090/api";

export const registerRequest = user => axios.post(`${API}/auth/nuevo`, user)