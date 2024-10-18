import { WASocket } from "baileys";
import { MessageType } from "../common/types";
import config from "../common/config.json";
import commandHanlder from "./commandHandler";
import getUserId from "../service/users/getuser_id";
import createUser from "../service/users/createuser";
import extractPhoneNumber from "../helpers/extractPhoneNumber";

export default async function messageHandler(
  message: MessageType,
  sock: WASocket
) {
  // Mengambil object dari chat / pesan
  const chat = message.messages[0];
  //   Mengambil text dari chat / pesan
  let chatValue: string = "";

  //   Kembalikan nilai null apabila tidak ada pesan
  if (!chat.message) return;

  //   Mengambil Tipe Pesan
  const messageType = Object.keys(chat.message)[0];

  //   Kondisi untuk pesan dari user
  if (message.type === "notify") {
    // Validasi dan mengambil text dari pesan yang diterima
    if (messageType === "conversation") {
      chatValue = chat.message!.conversation!;
    } else if (messageType === "imageMessage") {
      chatValue = chat.message!.imageMessage!.caption!;
    } else if (messageType === "extendedTextMessage") {
      chatValue = chat.message!.extendedTextMessage!.text!;
    } else if (messageType === "videoMessage") {
      chatValue = chat.message!.videoMessage!.caption!;
    }

    // Mengambil ID pesan
    const chatId: string = chat.key.remoteJid!;
    // Mengambil nilai prefix
    const prefix: string = config.prefix;
    // Validasi apakah chat berasal dari grup
    const isGroup: boolean = chatId.endsWith("@g.us");
    // Mengambil userID
    const userId: string = isGroup
      ? chat.key.participant!
      : chat.key.remoteJid!;

    // Periksa apakah pesan di mulai dengan prefix
    if (chatValue.startsWith(prefix)) {
      const existedUser = await getUserId(chatId).catch(async (error) => {
        console.log(error);
        await sock.sendMessage(
          chatId,
          { text: "Sedang terjadi masalah dengan server" },
          { quoted: chat }
        );

        return;
      });
      if (!existedUser || existedUser.data === null) {
        try {
          const waNumber = await extractPhoneNumber(userId);
          await createUser(chatId, waNumber).catch(async (error) => {
            console.log(error);
            await sock.sendMessage(
              chatId,
              { text: "Sedang terjadi masalah dengan server" },
              { quoted: chat }
            );

            return;
          });

          const args = chatValue!.slice(prefix.length).trim().split(/ +/);
          commandHanlder({
            args,
            sock,
            chatId,
            chat,
            isGroup,
            userId,
            chatValue,
          });
          return;
        } catch (error) {
          await sock.sendMessage(chatId, {
            text: "Sedang terjadi masalah dengan server!",
          });
          console.log("Terjadi kesalahan saat membuat user : ", error);
          return;
        }
      }

      const args = chatValue!.slice(prefix.length).trim().split(/ +/);
      commandHanlder({ args, sock, chatId, chat, isGroup, userId, chatValue });
      return;
    }
  }
}
