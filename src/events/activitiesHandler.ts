import { WAMessage, WASocket } from "baileys";
import getUserId from "../service/users/getuser_id";
import createUser from "../service/users/createuser";
import createActivity from "../service/activity/createActivity";

export async function checkUser(
  waNumber: string,
  sock: WASocket,
  chatId: string,
  chat: WAMessage
) {
  try {
    // SEDANG DALAM PENGEMBANGAN LEBIH LANJUT

    const existedUser = await getUserId(waNumber).catch(async (error) => {
      console.log(error);
      await sock.sendMessage(
        chatId,
        { text: "Sedang terjadi masalah dengan server" },
        { quoted: chat }
      );

      return null;
    });

    if (!existedUser || existedUser == null) {
      await createUser(waNumber).catch(async (error) => {
        console.log(error);
        return null;
      });
    }
  } catch (error) {
    console.log(error);
    await sock.sendMessage(
      chatId,
      { text: "Sedang terjadi masalah dengan server" },
      { quoted: chat }
    );

    return;
  }
}

export async function activity(
  chatId: string,
  waNumber: string,
  commandName: string,
  chatValue: string,
  sock: WASocket,
  chat: WAMessage
) {
  await createActivity(chatId, waNumber, commandName, chatValue).catch(
    async (error) => {
      await sock.sendMessage(
        chatId,
        {
          text: "Terjadi kesalahan dengan server!",
        },
        { quoted: chat }
      );

      console.log(error);
      return null;
    }
  );
}
