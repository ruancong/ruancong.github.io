<template>
  <span class="audio-player" @click="togglePlay">
    <i class="fas fa-volume-up"></i>
    <audio ref="audioElement" :src="audioUrl" style="display: none;"></audio>
  </span>
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

<style scoped>
.audio-player {
  cursor: pointer;
  margin-left: 5px;
}

.fa-volume-up {
  font-size: 18px;
  color: #333;
}

.fa-volume-up:hover {
  color: #666;
}
</style>
