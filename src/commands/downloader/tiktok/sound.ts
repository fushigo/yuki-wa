import queryValidation from "../../../helpers/queryValidation";
import shortUrl from "../../../helpers/shortUrl";
import { CommandType } from "../../../common/types";
import Tiktok from "@tobyg74/tiktok-api-dl";
import loading from "../../utils/loading,";

const tiktokSoundDownloader: CommandType = {
  data: {
    name: "tiktoksound",
    aliases: ["tsnd", "tsound"],
  },

  async execute({ chatId, sock, chat, query }) {
    const qvalid = queryValidation(query);
    if (!qvalid) {
      await sock.sendMessage(
        chatId,
        { text: "Sertakan url tiktok" },
        { quoted: chat }
      );
      return;
    }

    try {
      await loading(sock, chatId, chat!);
      await Tiktok.Downloader(query!, { version: "v3" }).then(
        async (result) => {
          const soundUrl = result.result?.music;

          const message = {
            text: `*URL SOUND*
  ${soundUrl !== null ? await shortUrl(soundUrl!) : ""}
  `,
          };

          await sock.sendMessage(chatId, message, { quoted: chat });
          return;
        }
      );
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

export default tiktokSoundDownloader;
