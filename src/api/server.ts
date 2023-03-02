import axios from "axios";

const baseUrl = import.meta.env.VITE_DB_URL;

export async function getServerById(id: string): Promise<ApiResponse | null> {
  const { data } = await axios.get(`${baseUrl}/server/${id}`);
  console.log("data,", data);
  return data;
}
