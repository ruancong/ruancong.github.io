// 有道词典API

import { postRequestWithFormData } from "../utils/request";

// 使用 Cloudflare Worker 代理
const PROXY_URL = "https://vpn.ruancong130.workers.dev/?url=";

const YOUDAO_API = {
  WORD_QUERY: `${PROXY_URL}${encodeURIComponent(
    "https://dict.youdao.com/jsonapi_s?doctype=json&jsonversion=4"
  )}`,
};

// 获取单词信息
export const getWordInfo = async (word) => {
  const response = await postRequestWithFormData(YOUDAO_API.WORD_QUERY, {
    q: word,
  });
  return response;
};
