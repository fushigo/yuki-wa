import { CommandType } from "../../common/types";

const listGroup: CommandType = {
  data: {
    name: "group",
    aliases: ["grp"],
  },

  async execute({ chatId, sock, chat }) {
    const message = {
      text: `*ADMIN*
SEDANG DALAM PENGEMBANGAN

*MEMBER*
contoh perintah .hidetag (pesan)
1. *.hidetag* Tag semua member yang berada di grup 
        
*NOTE* Perintah ini hanya bisa digunakan di dalam grup
`,
    };

    await sock.sendMessage(chatId, message, { quoted: chat });
  },
};

export default listGroup;
