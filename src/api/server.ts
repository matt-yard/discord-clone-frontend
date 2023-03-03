import axios from "axios";

const baseUrl = import.meta.env.VITE_DB_URL;

export async function getServerById(id: string): Promise<ApiResponse | null> {
  const { data } = await axios.get(`${baseUrl}/server/${id}`);

  return data;
}

export async function getChannelMessages(
  id: string
): Promise<ApiResponse | null> {
  const { data } = await axios.get(`${baseUrl}/channel/${id}`);
  console.log("data,", data);
  return data;
}
