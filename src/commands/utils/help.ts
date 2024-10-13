import { CommandType } from "../../common/types";

const help: CommandType = {
  data: {
    name: "help",
    aliases: ["hlp"],
  },
  async execute({ chatId, sock, chat }) {
    const message = {
      text: `Perintah yang tersedia:
      
1. *.downloader* Menampilkan list downloader yang tersedia
2. *.converter* Menampilkan list converter yang tersedia
3. *.gamelist* Menampilkan list game yang tersedia
4. *.ekonomi* Menampilkan list ekonomi yang tersedia

~Yuki BOT⭐`,
    };

    await sock.sendMessage(chatId, message, { quoted: chat });
    return;
  },
};

export default help;
