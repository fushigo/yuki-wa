import { CommandType } from "../../common/types";

const listConverter: CommandType = {
  data: {
    name: "listconverter",
    aliases: ["converter"],
  },

  async execute({ chatId, chat, sock }) {
    const message = {
      text: `*CONVERTER*
contoh perintah: .remini (Jangan lupa sertakan gambar)
1. *.remini* Memperbaiki kualitas gambar menggunakan AI.
2. *.sticker* Mengubah gambar / foto menjadi sticker (format .jpg/jpeg & .png).
`,
    };
    await sock.sendMessage(chatId, message, { quoted: chat });
    return;
  },
};

export default listConverter;
