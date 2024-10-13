import { downloadMediaMessage } from "baileys";
import { CommandType } from "../../common/types";
import reminiUpscale from "../../service/remini/upscale";
import getJobs from "../../service/remini/getjobs";
import loading from "../utils/loading,";

const converterRemini: CommandType = {
  data: {
    name: "remini",
    aliases: ["rm", "hd"],
  },

  async execute({ chatId, chat, sock, image }) {
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
      // Mengunduh media dari pesan
      const downloadingMedia = await downloadMediaMessage(chat!, "buffer", {});

      if (!downloadingMedia) {
        await sock.sendMessage(
          chatId,
          { text: "Gagal mengunduh media" },
          { quoted: chat }
        );
        return;
      }

      // Konversi buffer ke base64
      const base64Data = downloadingMedia.toString("base64");

      // Tampilkan pesan loading
      await loading(sock, chatId, chat!);

      // Proses upscale dengan Remini
      const upscaleResult = await reminiUpscale(base64Data);

      // Pastikan response dari remini valid
      if (!upscaleResult || !upscaleResult.data) {
        await sock.sendMessage(
          chatId,
          { text: "Gagal upscale gambar" },
          { quoted: chat }
        );
        return;
      }

      const jobId = upscaleResult.data.job;
      let jobResult;

      // Polling job status
      for (let attempt = 0; attempt < 10; attempt++) {
        jobResult = await getJobs(jobId);

        console.log(jobResult);

        if (jobResult.data.status === "succeeded") {
          // console.log("Job selesai:", jobResult);
          await sock.sendMessage(
            chatId,
            {
              image: { url: jobResult.data.imageUrl },
              caption: "Ini gambar HD",
            },
            { quoted: chat }
          );
          return;
        } else if (jobResult.data.status === "failed") {
          await sock.sendMessage(
            chatId,
            { text: "Upscale gambar gagal" },
            { quoted: chat }
          );
          return;
        }

        // Tunggu sebelum melakukan polling lagi
        await new Promise((resolve) => setTimeout(resolve, 15000)); // menunggu 15 detik sebelum mengecek ulang
      }

      // Jika job tidak selesai dalam waktu yang diharapkan
      await sock.sendMessage(
        chatId,
        { text: "Proses upscale memakan waktu terlalu lama" },
        { quoted: chat }
      );

      return;
    } catch (error) {
      console.log(`Terjadi error saat menjalankan ${this.data.name} : `, error);
      console.error("Error details:", error);
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

export default converterRemini;
