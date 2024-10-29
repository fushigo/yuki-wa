import { MessageUpsertType, WAMessage, WASocket } from "baileys";

export interface MessageType {
  messages: WAMessage[];
  type: MessageUpsertType;
}

export interface CommandHandlerType {
  args: string[];
  sock: WASocket;
  chatId: string;
  chat: WAMessage;
  isGroup: boolean;
  userId: string;
  chatValue: string;
  waNumber: string;
}

export interface TypeCommandParams {
  chatId: string;
  query?: string;
  image?: string;
  sock: WASocket;
  chat?: WAMessage;
  isGroup?: boolean;
  userId: string;
  media?: any;
}

export interface CommandType {
  data: {
    name: string;
    aliases: Array<string>;
  };
  execute: (params: TypeCommandParams) => Promise<void>;
}
