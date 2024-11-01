import { downloadMediaMessage, proto, WAMessageKey } from "baileys";
import { CommandType } from "../../common/types";

const spill: CommandType = {
  data: {
    name: "spill",
    aliases: ["reveal"],
  },

  async execute({ chatId, chat, sock }) {
    const validate: boolean =
      chat?.message?.extendedTextMessage?.contextInfo?.quotedMessage
        ?.viewOnceMessageV2 !== undefined;

    const quotedViewOnceMessage =
      chat?.message?.extendedTextMessage?.contextInfo?.quotedMessage
        ?.viewOnceMessageV2?.message;

    // Membuat custom message key alih alih sebagai IWebMessageInfo
    const message: { key: WAMessageKey; message: proto.IMessage } = {
      key: {
        remoteJid: chat?.key.remoteJid, // Ambil remoteJid dari chat
        id: chat?.message?.extendedTextMessage?.contextInfo?.stanzaId, // Ambil stanzaId sebagai id
        fromMe: false, // Sesuaikan dengan siapa yang mengirim pesan
        participant: chat?.key.participant || undefined, // Jika ada, ambil participant
      },
      message: quotedViewOnceMessage!, // Set message ke quotedMessage yang valid
    };

    // console.log(chat?.message?.extendedTextMessage?.contextInfo);

    // Jika chat tidak viewOnce
    if (!validate) {
      await sock.sendMessage(chatId, {
        text: "Pastikan pesan yang di reply adalah sekali lihat",
      });

      return;
    }

    try {
      const downloadMedia = await downloadMediaMessage(message, "buffer", {});

      if (quotedViewOnceMessage?.imageMessage) {
        await sock.sendMessage(
          chatId,
          { image: downloadMedia, caption: "REVEAL!, AWAS ORANG NYA MARAH." },
          { quoted: chat }
        );
      } else {
        await sock.sendMessage(
          chatId,
          { video: downloadMedia, caption: "REVEAL!, AWAS ORANG NYA MARAH." },
          { quoted: chat }
        );
      }
    } catch (error) {
      console.log(error);
      await sock.sendMessage(
        chatId,
        {
          text: "Terjadi kesalahan saat menjalankan perintah ini.",
        },
        { quoted: chat }
      );
      return;
    }

    return;
  },
};

export default spill;
