import axios from "axios";
import BASE_URL from "../../common/api/endpoint";

export default async function createUser(chatId: string, waNumber: string) {
  const payload = {
    chatId: chatId,
    waNumber: waNumber,
  };

  await axios.post(`${BASE_URL}/users`, payload, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Yuki/1.0.0",
    },
  });

  return;
}
