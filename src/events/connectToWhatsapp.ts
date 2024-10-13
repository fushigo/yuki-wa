import makeWASocket, {
  Browsers,
  ConnectionState,
  useMultiFileAuthState,
  UserFacingSocketConfig,
  WACallEvent,
} from "baileys";
import { Logger } from "pino";
import logger from "../helpers/logger";
import connectionUpdate from "./connectionUpdate";
import eventRejectCall from "./rejectCall";
import messageHandler from "./messageHanlder";

// Nama folder / lokasi session
const sessionName = "session";

export default async function connectToWhatsapp() {
  // Membuat dan Menyimpan state session Whatsapp
  const { state, saveCreds } = await useMultiFileAuthState(
    `./${sessionName ? sessionName : "session"}`
  );

  //   Membuat logger dari pino
  const pinoLogger: Logger = logger;

  //   Konfigurasi socket
  const sockConfig: UserFacingSocketConfig = {
    logger: pinoLogger,
    browser: Browsers.macOS("Desktop"),
    auth: state,
    printQRInTerminal: true,
    qrTimeout: 20000,
  };

  // Membuat whatsapp socket
  const sock = makeWASocket(sockConfig);

  // Handle event yang terjadi
  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", (update: Partial<ConnectionState>) =>
    connectionUpdate(update)
  );
  sock.ev.on("call", (callMessage: WACallEvent[]) =>
    eventRejectCall(callMessage, sock)
  );
  sock.ev.on(
    "messages.upsert",
    async (message) => await messageHandler(message, sock)
  );

  return;
}
