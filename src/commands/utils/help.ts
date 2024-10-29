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
3. *.questionai* Menampilkan list question ai yang tersedia
4. *.group* Menampilkan list perintah grup yang tersedia

*NOTES* Jika terjadi masalah beberapa kali gunakan perintah .vcard untuk menampilkan kontak admin.

~Yuki BOT⭐`,
    };

    await sock.sendMessage(chatId, message, { quoted: chat });
    return;
  },
};

export default help;
