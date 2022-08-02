<template lang="pug">
video(
  v-if="mediaFile"
  ref="videoPlayer"
  :src="mediaUrl"
  v-on:click="playing = !playing"
  v-on:timeupdate="seekChanged"
  v-on:pause="playing=false"
  v-on:play="playing=true"
  autoplay)
control-panel(
  :duration='mediaFile?.duration ?? 1000'
  v-model:playing="playing"
  :position="position"
  v-on:update:position="sliderChanged"
  )
</template>

<script lang="ts">
export default {
  name: "PlayerView"
}
</script>

<script lang="ts" setup>

import {computed, ref, watch} from "vue";
import ControlPanel from "./ControlPanel.vue";
import {MediaFile} from "../store/BooClient";

const playing = ref<boolean>(false)
const position = ref<number>(0)

const videoPlayer = ref<HTMLVideoElement>()
// const togglePlay = (()=>{
//   const player = videoPlayer.value
//   if(player) {
//     if(player.paused) {
//       player.play()
//     } else {
//       player.pause()
//     }
//   }
// })

watch(playing, (v)=>{
  const player = videoPlayer.value
  if(player) {
    if (v && player.paused) {
      player.play()
    } else if (!v && !player.paused) {
      player.pause()
    }
  }
})

const seekChanged = (event:Event)=>{
  // console.log("seekChanged")
  const pos = (event.target as HTMLVideoElement).currentTime
  if(pos!=position.value) {
    position.value = pos
  }
}
const sliderChanged = (v:number)=>{
  // console.log("sliderChanged")
  const player = videoPlayer.value
  if(player) {
    if (v != position.value) {
      position.value = v
      player.currentTime = v
    }
  }
}

interface Props {
  mediaFile?:MediaFile
}
const props = defineProps<Props>()
const mediaUrl = computed<string>(()=>{
  return props.mediaFile?.url() ?? ""
})

// const dbgUpdateFull = (v:boolean)=> {
//   console.log("dbgUpdateFull")
//   fullscreen.value = v
// }
</script>


<style scoped lang="sass">
.w-toolbar
  height: 50px

</style>