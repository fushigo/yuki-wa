import converterRemini from "./converter/remini";
import converterSticker from "./converter/sticker";
import tiktokSoundDownloader from "./downloader/tiktok/sound";
import tiktokVideoDownloader from "./downloader/tiktok/video";
import questionaiDalle from "./questionai/dalle";
import questionAiGpt from "./questionai/gpt";
import questionAiProdia from "./questionai/prodia";
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
  questionAiGpt,
  questionAiProdia,
  questionaiDalle,
};
