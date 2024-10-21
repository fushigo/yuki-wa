import { CommandType } from "../../common/types";

const listQuestionAi: CommandType = {
  data: {
    name: "questionai",
    aliases: ["lquestai", "questai"],
  },

  async execute({ chatId, chat, sock }) {
    const message = {
      text: `*QUESTION AI*
contoh perintah: .prodia (perintah)
1. *.gpt* Mengerjakan / menjawab pertanyaan yang diberikan menggunakan Chat GPT-3.
2. *.prodia* Generate gambar dengan grafis 2D menggunakan AI (NSFW WARNING).
3. *.dalle* Generate gambar dengan grafis 3D / Nyata menggunakan AI (SAFE FROM NSFW).
            `,
    };
    await sock.sendMessage(chatId, message, { quoted: chat });
    return;
  },
};

export default listQuestionAi;
