<template lang="pug">
w-toolbar(bg-color="blue-light5" color="blue-dark3")
  w-button.ma1(bg-color="transparent" icon="mdi mdi-chevron-left" xl v-on:click="prev")
  w-button.ma1(bg-color="transparent" icon="mdi mdi-chevron-right" xl v-on:click="next")
  w-button.ma1(bg-color="transparent" :icon="'mdi mdi-' + (playingRef ? 'pause' : 'play')" xl v-on:click="playingRef = !playingRef")
  w-slider.ml3.mr3(min="0" :max="duration" v-model="positionRef")
  w-button.ma1(bg-color="transparent" :icon="'mdi mdi-' + (fullscreen ? 'fullscreen-exit' : 'fullscreen')" xl v-on:click="toggleFullscreen")
</template>

<script lang="ts">
export default {
  name: "ControlPanel"
}
</script>

<script setup lang="ts">
import {computed, defineEmits, defineProps, inject, toRefs, watch} from "vue";
import {providerKeyFullscreen, providerKeyNext, providerKeyPrev} from "./keys";

interface Props {
  playing:boolean,
  duration:number,
  position:number,
}
const props =withDefaults(defineProps<Props>(), {
  playing:false,
  duration:1000,
  position: 0
})
const emit = defineEmits<{
    (e: 'update:playing', playing: boolean): void
    (e: 'update:position', position: number): void
}>()

const { playing, duration, position } = toRefs(props)

const fullscreen = inject(providerKeyFullscreen)
const next = inject(providerKeyNext)
const prev = inject(providerKeyPrev)

const positionRef = computed<number>({
  get: ()=>position.value,
  set: v => {
    console.log("position="+v)
    emit('update:position', v)
  }
})

const playingRef = computed<boolean>({
  get: ()=>playing.value,
  set: v => {
    console.log("playing="+v)
    emit('update:playing', v)
  }
})

// const togglePlaying = (()=>{
//   console.log(`toggle playing=${playing.value}`)
//   emit('update:playing', !playing.value)
// })
const toggleFullscreen = (()=>{
  // console.log(`toggle fullscreen=${fullscreen.value}`)
  // emit('update:fullscreen', !fullscreen.value)
  if(fullscreen) {
    fullscreen.value = !fullscreen.value
  }
})

// watch(props.position, (v)=>{
//   console.log(`position=${position.value}`)
// })

</script>

<style scoped lang="sass">
.w-toolbar
  height: 50px
  flex-grow: 0
.w-slider
  flex-grow: 1

</style>