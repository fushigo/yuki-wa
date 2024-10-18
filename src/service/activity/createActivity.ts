import axios from "axios";
import { ACTIVITIES, OPTIONS } from "../../common/api/endpoint";

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

  await axios.post(`${ACTIVITIES}`, payload, OPTIONS);

  return;
}
