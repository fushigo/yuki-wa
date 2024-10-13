import axios from "axios";
import BASE_URL from "../../common/api/endpoint";

export default async function getUserId(chatId: string) {
  const data = await axios.get(`${BASE_URL}/users/${chatId}`);
  return data.data;
}
