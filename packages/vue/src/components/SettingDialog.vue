<template lang="pug">
w-dialog(
  v-model="showSettingsDialog"
  fullscreen=false
  width=400
  persistent=false
  persistent-no-animation=false
  title-class="primary-light1--bg white")
  template(#title)
    w-icon.mr2 mdi mdi-tune
    | Settings
  span.mr2 Source:
  .w-flex.ml4
    w-radios(
      v-model="selectedType"
      :items="types"
      item-value-key="id"
      inline)
  span.mr2 Mark:
  .w-flex.ml4
    w-button.mr2(v-for="mark in marks", :icon="'mdi '+mark.iconOn", lg, :bg-color="(mark.selected)?'primary':'transparent'" v-on:click="mark.selected=!mark.selected")
    //w-button(icon="mdi mdi-flag" xl bg-color="transparent" )
    //w-button(icon="mdi mdi-heart" xl bg-color="secondary")
    //w-button(icon="mdi mdi-star" xl)

  span.mr2 Rating
  .w-flex.ml4
    w-icon.mr6(lg, color="primary") {{ratingIcon}}
    w-slider.mr4.grow(min=1, max=5, step=1, v-model="ratingThreshold")

  template(#actions)
    .spacer
    w-button(@click="onOk").mr2 OK
    w-button(@click="showSettingsDialog = false") Cancel
</template>

<script lang="ts">
export default {
  name: "SettingDialog"
}
</script>

<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue";
import {SourceType, Mark, pushCurrentSettings, popCurrentSettings, applySettings, Rating} from "../store/Settings";

const showSettingsDialog = ref(false)

const types = SourceType.types
const selectedType = ref(SourceType.activeSourceType.id)
const marks = reactive(Mark.marks)
const ratingThreshold = ref(Rating.ratingThreshold)

const ratingIcon = computed(()=>{
  return Rating.ratingOf(ratingThreshold.value).icon
})

const onOk = ()=>{
  console.log(Mark.marks.reduce((acc,v)=>{return acc+`${v.name}=${v.selected}, `}, ""))
  applySettings(selectedType.value, ratingThreshold.value)
  showSettingsDialog.value = false
}

const showDialog = ()=>{
  if(!showSettingsDialog.value) {
    pushCurrentSettings()
    showSettingsDialog.value = true
  }
}

watch(showSettingsDialog, (v)=>{
  if(!v) {
    popCurrentSettings()
  }
})

defineExpose({showDialog})

</script>

<style scoped>

</style>