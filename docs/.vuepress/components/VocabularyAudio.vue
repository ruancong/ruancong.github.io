<template>
  <h4>单词多媒体信息:</h4>
  <div class="flex items-center">
    <span>美音: </span>
    <div
      class="ml-2 text-orange-500 text-5 active:opacity-50"
      i-material-symbols-volume-up-rounded
      @click="togglePlay"
    >
      <audio ref="audioElement" :src="audioUrl" style="display: none"></audio>
    </div>
  </div>

  <div class="flex items-center" @click="toggleMore">
    <span>相关图片视频</span>
    <div
      class="w-8 h-8"
      :class="{
        'i-si:expand-less-fill': isMore,
        'i-si:expand-more-fill text-orange-500': !isMore,
      }"
    ></div>
  </div>
  <div v-if="isMore">
    <div v-if="videoUrl">
      <p>视频讲解：</p>
      <video width="460" :src="videoUrl" controls></video>
    </div>
    <div v-if="picDict">
      <p>图片讲解：</p>
      <img class="max-w-200px" :src="picDict" alt="图片讲解" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { getWordInfo } from "../api/youdaoDicApi";

const { vocabulary } = defineProps({
  vocabulary: {
    type: String,
    required: true,
  },
});

const audioUrl = `https://dict.youdao.com/dictvoice?type=1&audio=${vocabulary}`;
const audioElement = ref(null);
const isMore = ref(false);
// 单词相关视频地址
const videoUrl = ref(null);
// 单词相关图片地址
const picDict = ref(null);

const togglePlay = () => {
  if (audioElement.value.paused) {
    audioElement.value.play();
  } else {
    audioElement.value.pause();
    audioElement.value.currentTime = 0; // 重置到开始位置
  }
};

const toggleMore = async () => {
  isMore.value = !isMore.value;
  if (isMore.value) {
    const response = await getWordInfo(vocabulary);
    console.log(response);
    videoUrl.value = response.word_video?.word_videos[0]?.video?.url;
    picDict.value = response.pic_dict?.pic[0]?.url;
  }
};
</script>
