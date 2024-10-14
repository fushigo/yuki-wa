import { CommandType } from "../../common/types";
import queryValidation from "../../helpers/queryValidation";
import gpt from "../../service/questionai/gpt"
import loading from "../utils/loading,";

const questionAiGpt: CommandType = {
  data: {
    name: "gpt",
    aliases: ["gpt"],
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
      const result = await gpt(query!);
      // console.log(result);

      await sock.sendMessage(
        chatId,
        { text: `${result.data}` },
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

export default questionAiGpt;
