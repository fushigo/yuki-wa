import { CommandType } from "../../common/types";

const vcard: CommandType = {
  data: {
    name: "vcard",
    aliases: ["vcd"],
  },

  async execute({ chatId, sock }) {
    const vcard =
      "BEGIN:VCARD\n" + // metadata of the contact card
      "VERSION:3.0\n" +
      "FN:Rizky Andika\n" + // full name
      "ORG:Fugodev;\n" + // the organization of the contact
      "TEL;type=CELL;type=VOICE;waid=6285161742553:+62 85161 742553\n" + // WhatsApp ID + phone number
      "END:VCARD";

    await sock.sendMessage(chatId, {
      contacts: {
        displayName: "Rizky Andika",
        contacts: [{ vcard }],
      },
    });
  },
};

export default vcard;
