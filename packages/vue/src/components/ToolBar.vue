<template lang="pug">
w-flex.row.align-center
  w-button.ma1(bg-color="transparent" icon="mdi mdi-menu" xl v-on:click="emit('toggle-drawer')")
  span.ml3.title2.text-capitalize Boo Player on Vue
  w-flex.row.justify-end.grow
  w-button.ma1(bg-color="transparent" icon="mdi mdi-cog" xl v-on:click="settingDialog.showDialog()")

setting-dialog(ref="settingDialog")
</template>

<script lang="ts">
export default {
  name: "ToolBar"
}
</script>
<script lang="ts" setup>
import {defineEmits, ref} from "vue";
import SettingDialog from "./SettingDialog.vue";
const emit = defineEmits(["toggle-drawer"])
const settingDialog = ref()

</script>

<style scoped>

</style>