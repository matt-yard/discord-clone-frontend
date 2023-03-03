import axios from "axios";

const baseUrl = import.meta.env.VITE_DB_URL;

export async function createNewChannel(
  serverId: string,
  channelName: string,
  channelType: string
): Promise<ApiResponse> {
  try {
    const { data } = await axios.post(
      `${baseUrl}/server/${serverId}/channels`,
      {
        name: channelName,
        type: channelType,
      }
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
}
