import axios from "axios";
axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_DB_URL;

console.log("baseURL", baseUrl);

export async function loginUser(
  email: string,
  password: string
): Promise<ApiResponse> {
  const { data } = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });

  return data;
}

export async function getMe(): Promise<ApiResponse> {
  const { data } = await axios.get(`${baseUrl}/auth/me`);

  return data;
}
