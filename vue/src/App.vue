<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Vue from 'vue'
import {computed, onMounted, onUnmounted, ref, watch, provide, nextTick} from "vue";
import '@mdi/font/css/materialdesignicons.min.css'
import {MediaFile, retrieveMediaList, mediaList as mediaListObservable } from "./store/BooClient";
import {Subscription} from "rxjs";
import {providerKeyFullscreen, providerKeyNext, providerKeyPrev} from "./components/keys";
import PlayerView from "./components/PlayerView.vue";
import ToolBar from "./components/ToolBar.vue";

const drawerVisible = ref(false)
const mediaList = ref<Array<MediaFile>>([])
const selectedMedia = ref<string>()
let subscription:Subscription|undefined

const fullscreen = ref<boolean>(false)
provide(providerKeyFullscreen, fullscreen)

const next = ()=>{
  console.log("next")
  const i = mediaList.value.findIndex((it)=>it.mediaId===selectedMedia.value)
  if(i>=0 && i+1<mediaList.value.length) {
    selectedMedia.value = mediaList.value[i+1].mediaId
  }
}
const prev = ()=>{
  console.log("prev")
  const i = mediaList.value.findIndex((it)=>it.mediaId===selectedMedia.value)
  if(i>0) {
    selectedMedia.value = mediaList.value[i-1].mediaId
  }
}
provide(providerKeyPrev, prev)
provide(providerKeyNext, next)

onMounted(()=>{
  subscription = mediaListObservable.subscribe((v)=>{
    drawerVisible.value = false
    nextTick(()=>{
      mediaList.value = v
      if(v.length>0) {
        selectedMedia.value = v[0].mediaId
        drawerVisible.value = true
      }
    })
  })
  retrieveMediaList()
})
onUnmounted(()=>{
  if(subscription) {
    subscription.unsubscribe()
    subscription = undefined
  }
})
// watch(selectedMedia, (v)=>{
//   console.log(`selected: ${v}`)
// })

// const mediaUrl = computed(()=>{
//   if(selectedMedia.value) {
//     return composeMediaUrl(selectedMedia.value)
//   } else return ""
// })

const currentMediaFile = computed<MediaFile|undefined>(()=>{
  return mediaList.value.find((it)=>it.mediaId===selectedMedia.value)
})

</script>

<template lang="pug">
w-app
  w-transition-expand(y)
    header(v-if="!fullscreen")
      tool-bar(v-on:toggle-drawer="drawerVisible=!drawerVisible")
      //w-flex.row.align-center
      //  w-button.ma1(bg-color="transparent" icon="mdi mdi-menu" xl v-on:click="drawerVisible=!drawerVisible")
      //  //w-icon.mr1(xl color="primary-dark1") mdi mdi-home
      //  //w-button.ma1(bg-color="transparent" icon="mdi mdi-home")
      //  //w-icon.mr1(xl color="primary-dark1") mdi mdi-home
      //  span.ml3.title2.text-capitalize Boo Player on Vue
      //  w-flex.row.justify-end.grow
      //    w-button.ma1(bg-color="transparent" icon="mdi mdi-cog" xl)

  w-flex.grow
    w-transition-expand(x)
      aside(v-if="drawerVisible && !fullscreen")
        w-list(v-model="selectedMedia" :items="mediaList" color="primary" multiple=false item-label-key="title" item-value-key="mediaId" hover)

    main.grow
      player-view(:media-file="currentMediaFile")
        //img(alt="Vue logo", src="./assets/logo.png")
        //hello-world(msg="Hello Vue 3 + TypeScript + Vite")
</template>

<style lang="sass" scoped>
.w-app
  padding: 4px
  background-color: #fffeed
  height: 100vh

header, footer, aside, main
  margin: 4px
  padding: 12px
  text-transform: uppercase
  color: #666
  border: 1px solid rgba(0, 0, 0, 0.07)

header, footer
  background-color: #e9f8fe
  min-height: 60px

aside
  width: 300px
  height: calc(100vh - 60px - 8*3px)
  background-color: #fef2ff
  overflow-y: auto

.scroller
  overflow-y: scroll

main
  background-color: #efffed
  display: flex
  flex-direction: column
video
  display: block

</style>
