import converterRemini from "./converter/remini";
import converterSticker from "./converter/sticker";
import tiktokSoundDownloader from "./downloader/tiktok/sound";
import tiktokVideoDownloader from "./downloader/tiktok/video";
import questionAiGemini from "./questionai/gemini";
import listDownloader from "./utils/downloader";
import help from "./utils/help";
import ping from "./utils/ping";

export default {
  ping,
  help,
  listDownloader,
  tiktokVideoDownloader,
  tiktokSoundDownloader,
  converterSticker,
  converterRemini,
  questionAiGemini,
};
