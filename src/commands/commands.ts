import converterRemini from "./converter/remini";
import converterSticker from "./converter/sticker";
import tiktokSoundDownloader from "./downloader/tiktok/sound";
import tiktokVideoDownloader from "./downloader/tiktok/video";
import questionaiDalle from "./questionai/dalle";
import questionAiGpt from "./questionai/gpt";
import questionAiProdia from "./questionai/prodia";
import listConverter from "./utils/converter";
import listDownloader from "./utils/downloader";
import help from "./utils/help";
import listModerator from "./utils/group";
import ping from "./utils/ping";
import listQuestionAi from "./utils/questionai";
import vcard from "./utils/vcard";
import groupHidetag from "./group/member/hidetag";

export default {
  ping,
  help,
  vcard,
  listDownloader,
  listConverter,
  listQuestionAi,
  listModerator,
  tiktokVideoDownloader,
  tiktokSoundDownloader,
  converterSticker,
  converterRemini,
  questionAiGpt,
  questionAiProdia,
  questionaiDalle,
  groupHidetag,
};
