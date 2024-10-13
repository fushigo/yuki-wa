import { Boom } from "@hapi/boom";
import { ConnectionState, DisconnectReason } from "baileys";
import connectToWhatsapp from "./connectToWhatsapp";

export default async function connectionUpdate(
  update: Partial<ConnectionState>
) {
  // Mengambil object dari parameter update
  const { connection, lastDisconnect } = update;

  //   Kondisi saat koneksi terputus
  if (connection === "close") {
    // Validasi apakah terputus karena bot logout
    const reconnect =
      lastDisconnect?.error instanceof Boom
        ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
        : true;

    console.log(
      "Koneksi terputus karena: ",
      lastDisconnect?.error,
      "Mencoba menghungkan kembali, ",
      reconnect
    );

    if (reconnect) {
      await connectToWhatsapp();
    }
    return;
  } else if (connection === "open") {
    console.log("Yuki ready to serve!");
    return;
  } else if (connection === "connecting") {
    console.log("Yuki sedang menghubungkan ke Whatsapp.");
    return;
  }
}
