import { CommandType } from "../../common/types";
import queryValidation from "../../helpers/queryValidation";
import prodia from "../../service/questionai/prodia";
import loading from "../utils/loading,";

const questionAiProdia: CommandType = {
  data: {
    name: "prodia",
    aliases: ["pdia"],
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

      const result = await prodia(query!);

      await sock.sendMessage(
        chatId,
        { image: { url: result.data } },
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

export default questionAiProdia;
