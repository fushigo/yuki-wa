import axios from "axios";
import { OPTIONS, USERS } from "../../common/api/endpoint";

export default async function getUserId(chatId: string) {
  const data = await axios.get(`${USERS}/${chatId}`, OPTIONS);
  return data.data;
}
