import axios from "axios";
import { ACTIVITIES, OPTIONS } from "../../common/api/endpoint";

export default async function createActivity(
  chatId: string,
  waNumber: string,
  usedCommand: string,
  lastChat: string
) {
  const payload = {
    chatId: chatId,
    waNumber: waNumber,
    usedCommand: usedCommand,
    lastChat: lastChat,
  };

  await axios.post(`${ACTIVITIES}`, payload, OPTIONS);

  return;
}
