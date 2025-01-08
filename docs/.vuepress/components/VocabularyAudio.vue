<template>
  <div class="flex items-center">
    <span>美音: </span>
    <div class="ml-2 text-orange-500 text-5 active:opacity-50" i-material-symbols-volume-up-rounded @click="togglePlay">
      <audio ref="audioElement" :src="audioUrl" style="display: none;"></audio>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const {vocabulary} = defineProps({
  vocabulary: {
    type: String,
    required: true
  }
})

const audioUrl = `https://dict.youdao.com/dictvoice?type=1&audio=${vocabulary}`;
const audioElement = ref(null)

const togglePlay = () => {
  if (audioElement.value.paused) {
    audioElement.value.play()
  } else {
    audioElement.value.pause()
    audioElement.value.currentTime = 0 // 重置到开始位置
  }
}
</script>