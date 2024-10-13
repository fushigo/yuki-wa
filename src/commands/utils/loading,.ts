import { WAMessage, WASocket } from "baileys";

export default async function loading(
  sock: WASocket,
  chatId: string,
  chat: WAMessage
) {
  await sock.sendMessage(chatId, { text: "Loading..." }, { quoted: chat });
}
