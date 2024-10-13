import { CommandType } from "../../common/types";
import queryValidation from "../../helpers/queryValidation";

const tokenCharacterAi: CommandType = {
  data: {
    name: "ctoken",
    aliases: ["ctoken"],
  },

  async execute({ chatId, sock, query, chat }) {
    const qvalid = queryValidation(query);
    if (!qvalid) {
      await sock.sendMessage(
        chatId,
        {
          text: "Sertakan token character.ai",
        },
        { quoted: chat }
      );
      return;
    }

    try {
        
    } catch (error) {
        
    }
  },
};
