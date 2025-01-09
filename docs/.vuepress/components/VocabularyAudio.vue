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
  <div v-if="mediaIsLoading">
    <p class="text-orange-500">加载中...</p>
  </div>
  <div v-else-if="isMore">
    <div v-if="isNoMediaData">
      <p class="text-orange-500">{{ noDataTip }}</p>
    </div>
     <div v-else-if="picUrl">
      <p>图片示意：</p>
      <img class="max-w-200px max-h-150px" :src="picUrl" alt="图片示意" />
    </div>
    <div v-if="videoUrl">
      <p>视频讲解：</p>
      <video class="max-w-95% w-420px" :src="videoUrl" controls></video>
    </div>
   
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { getWordInfo } from "../api/youdaoDicApi";

const { vocabulary } = defineProps({
  vocabulary: {
    type: String,
    required: true,
  },
});

const audioElement = ref(null);

// 单词相关音频地址
const audioUrl = `https://dict.youdao.com/dictvoice?type=1&audio=${vocabulary}`;

const mediaIsLoading = ref(false);
const isMore = ref(false);
const isMediaLoaded = ref(false);
// 单词相关视频地址
const videoUrl = ref(null);
// 单词相关图片地址
const picUrl = ref(null);

// 没有数据的提示
const noDataTip = ref("此单词暂无多媒体数据");

// 此单词没有多媒体数据
const isNoMediaData = computed(() => {
  return !videoUrl.value && !picUrl.value && isMediaLoaded.value;
});

const togglePlay = () => {
  if (audioElement.value.paused) {
    audioElement.value.play();
  } else {
    audioElement.value.pause();
    // 重置到开始位置
    audioElement.value.currentTime = 0; 
  }
};

const toggleMore = async () => {
  isMore.value = !isMore.value;
  
  // Only load media if it hasn't been loaded before
  if (!isMediaLoaded.value && isMore.value) {
    mediaIsLoading.value = true;
    try {
      const response = await getWordInfo(vocabulary);
      videoUrl.value = response.videoUrl;
      picUrl.value = response.picUrl;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        noDataTip.value = "你的网络可能需要梯子";
      } else {
        noDataTip.value = "获取单词信息失败";
      }
    } finally {
      mediaIsLoading.value = false;
      isMediaLoaded.value = true;
    }
  }
};
</script>
 