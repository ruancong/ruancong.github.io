// 有道词典API

import { postRequestWithFormData } from "../utils/request";
import { WORD_MEDIA } from "../utils/words-media-constants";

// 使用 Cloudflare Worker 代理
const PROXY_URL = "https://vpn.ruancong130.workers.dev/?url=";

const YOUDAO_API = {
  WORD_QUERY: `${PROXY_URL}${encodeURIComponent(
    "https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4"
  )}`,
};

// 获取单词信息
export const getWordInfo = async (word) => {
  word = word.toLowerCase();
  if (WORD_MEDIA[word]) {
    return WORD_MEDIA[word];
  }

  const response = await postRequestWithFormData(YOUDAO_API.WORD_QUERY, {
    q: word,
  });
  const wordMedia = {
    videoUrl: response.word_video?.word_videos[0]?.video?.url,
    picUrl: response.pic_dict?.pic[0]?.url,
  };

  console.log(`${word} :`, wordMedia);
  return wordMedia;
};
