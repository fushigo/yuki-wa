import { downloadMediaMessage } from "baileys";
import { CommandType } from "../../common/types";
import sharp from "sharp";

const converterSticker: CommandType = {
  data: {
    name: "stciker",
    aliases: ["s", "stick", "stk"],
  },

  async execute({ chatId, sock, chat, image }) {
    // Validasi image query
    if (!image && !chat?.message?.imageMessage) {
      await sock.sendMessage(
        chatId,
        { text: "Sertakan gambar" },
        { quoted: chat }
      );
      return;
    }

    try {
      // Downloading media dari chat
      const downloadingMedia = await downloadMediaMessage(chat!, "buffer", {});

      // Konversi media menjadi sticker
      const stickerBuffer = await sharp(downloadingMedia)
        .resize(512, 512)
        .toFormat("webp")
        .webp({ quality: 100 })
        .toBuffer();

      await sock.sendMessage(chatId, { sticker: stickerBuffer });
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

export default converterSticker;
