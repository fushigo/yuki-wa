import { CommandType } from "../../../common/types";

const groupHidetag: CommandType = {
  data: {
    name: "hidetag",
    aliases: ["ht", "h", "tg", "tag"],
  },

  async execute({ chatId, sock, query, chat, isGroup }) {
    if (!isGroup) {
      await sock.sendMessage(chatId, {
        text: "Perintah hanya bisa digunakan di dalam group",
      });

      return;
    }

    try {
      const groupMetadata = await sock.groupMetadata(chatId);
      const participans = groupMetadata.participants.map((p) => p.id);
      const mentions = participans;

      await sock.sendMessage(
        chatId,
        {
          text: query !== null ? query! : "...",
          mentions,
        },
        { quoted: chat }
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

export default groupHidetag;
