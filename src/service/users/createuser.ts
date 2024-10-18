import axios from "axios";
import { OPTIONS, USERS } from "../../common/api/endpoint";

export default async function createUser(chatId: string, waNumber: string) {
  const payload = {
    chatId: chatId,
    waNumber: waNumber,
  };

  await axios.post(`${USERS}`, payload, OPTIONS);

  return;
}
