import { CommandType } from "../../common/types";

const ping: CommandType = {
  data: {
    name: "ping",
    aliases: ["pg"],
  },

  async execute({ chatId, sock }) {
    await sock.sendMessage(chatId, { text: "pong!" });
    return;
  },
};

export default ping;
