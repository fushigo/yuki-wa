import { CommandType } from "../../common/types";
import queryValidation from "../../helpers/queryValidation";
import dalle from "../../service/questionai/dalle";
import loading from "../utils/loading,";

const questionaiDalle: CommandType = {
  data: {
    name: "dalle",
    aliases: ["dle"],
  },
  async execute({ chatId, chat, query, sock }) {
    const qvalid = queryValidation(query);
    if (!qvalid) {
      await sock.sendMessage(
        chatId,
        { text: "Sertakan promp" },
        { quoted: chat }
      );
      return;
    }

    try {
      await loading(sock, chatId, chat!);
      const result = await dalle(query!);

      // console.log(result);

      if (!result.data && result.statusCode === 200) {
        await sock.sendMessage(
          chatId,
          { text: `Sepertinya konten anda melanggar kebijakan kami!` },
          { quoted: chat }
        );
      }

      await sock.sendMessage(
        chatId,
        { image: { url: `${result.data}` } },
        { quoted: chat }
      );

      return;
    } catch (error) {
      console.log(`Terjadi error saat menjalankan ${this.data.name} : `, error);
      await sock.sendMessage(
        chatId,
        {
          text: "Terjadi kesalahan saat menjalankan perintah ini.",
        },
        { quoted: chat }
      );
      return;
    }
  },
};

export default questionaiDalle;
