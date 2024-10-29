import { CommandHandlerType } from "../common/types";
import commands from "../commands/commands";
import help from "../commands/utils/help";
import createActivity from "../service/activity/createActivity";

export default async function commandHanlder({
  args,
  sock,
  chatId,
  chat,
  isGroup,
  userId,
  chatValue,
  waNumber,
}: CommandHandlerType) {
  if (args.length < 0 || args[0] === "") {
    return await sock.sendMessage(
      chatId!,
      {
        text: "Apa yang harus Yuki lakukan, oni-chan? (✿◠‿◠)",
      },
      { quoted: chat }
    );
  }

  const commandName: string = args.shift()!.toLocaleLowerCase();
  const query: string = args.join(" ");
  const image: any = chat.message?.imageMessage;
  const video: any = chat.message?.videoMessage;
  const media = video ? video : image;

  let command = Object.values(commands).find(
    (cmd) =>
      cmd.data.name === commandName || cmd.data.aliases.includes(commandName)
  );

  if (command) {
    try {
      await createActivity(
        chatId,
        waNumber,
        command.data.name,
        chatValue
      ).catch(async (error) => {
        await sock.sendMessage(
          chatId,
          {
            text: "Terjadi kesalahan dengan server!",
          },
          { quoted: chat }
        );

        console.log(error);
        return null;
      });

      await command.execute({
        chatId,
        chat,
        sock,
        image,
        query,
        isGroup,
        userId,
        media,
      });
      return;
    } catch (error) {
      await sock.sendMessage(
        chatId,
        {
          text: "Terjadi kesalahan saat menjalankan perintah!",
        },
        { quoted: chat }
      );
      console.log("Saat menjalankan perintah terjadi error: ", error);
      return;
    }
  } else {
    await sock.sendMessage(
      chatId,
      {
        text: "Perintah tidak ditemukan.",
      },
      { quoted: chat }
    );
    await help.execute({
      chatId,
      sock,
      chat,
      userId,
    });
    return;
  }
}
