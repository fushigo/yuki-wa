import queryValidation from "../../../helpers/queryValidation";
import { CommandType } from "../../../common/types";
import loading from "../../utils/loading,";

const instagramPostDownloader: CommandType = {
  data: {
    name: "postig",
    aliases: ["poig"],
  },

  async execute({ chatId, sock, chat, query }) {
    const qvalid = queryValidation(query);
    if (!qvalid) {
      await sock.sendMessage(
        chatId,
        { text: "Sertakan url instagram" },
        { quoted: chat }
      );
      return;
    }

    try {
      await loading(sock, chatId, chat!);

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

export default instagramPostDownloader;
