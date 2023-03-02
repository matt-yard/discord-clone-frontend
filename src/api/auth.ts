import axios, { AxiosError } from "axios";
axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_DB_URL;

console.log("baseURL", baseUrl);

export async function loginUser(
  email: string,
  password: string
): Promise<ApiResponse> {
  try {
    const { data } = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function getMe(): Promise<ApiResponse> {
  try {
    const { data } = await axios.get(`${baseUrl}/auth/me`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}
