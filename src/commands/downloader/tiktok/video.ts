import queryValidation from "../../../helpers/queryValidation";
import shortUrl from "../../../helpers/shortUrl";
import { CommandType } from "../../../common/types";
import Tiktok from "@tobyg74/tiktok-api-dl";
import loading from "../../utils/loading,";

const tiktokVideoDownloader: CommandType = {
  data: {
    name: "tiktokvideo",
    aliases: ["tvid", "tvideo"],
  },
  async execute({ chatId, chat, query, sock }) {
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
          const videoUrl = result.result?.video1;
          const videoHD = result.result?.videoHD;

          const message = {
            text: `*URL VIDEO*
${videoUrl !== null ? await shortUrl(videoUrl!) : ""}

*URL VIDEO HD*
${videoHD !== null ? await shortUrl(videoHD!) : ""}
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

export default tiktokVideoDownloader;
