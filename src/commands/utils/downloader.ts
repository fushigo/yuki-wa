import { CommandType } from "../../common/types";

const listDownloader: CommandType = {
  data: {
    name: "listdownloader",
    aliases: ["downloader", "dl"],
  },

  async execute({ chatId, chat, sock }) {
    const message = {
      text: `*TIKTOK*
contoh perintah: .tvid url
1. *.tvid* Mengunduh video tiktok.
2. *.tsnd* Mengunduh sound tiktok.

*INSTAGRAM*
contoh perintah: .poig url
*UNDER MAINTENANCE*
`,
    };
    await sock.sendMessage(chatId, message, { quoted: chat });
    return;
  },
};

export default listDownloader;
