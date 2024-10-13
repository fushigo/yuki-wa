import axios from "axios";
import BASE_URL from "../../common/api/endpoint";

export default async function createActivity(
  chatId: string,
  usedCommand: string,
  lastChat: string
) {
  const payload = {
    chatId: chatId,
    usedCommand: usedCommand,
    lastChat: lastChat,
  };

  await axios.post(`${BASE_URL}/activities`, payload, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Yuki/1.0.0",
    },
  });

  return;
}
