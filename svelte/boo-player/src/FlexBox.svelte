<script lang="ts">
    /**
     * 指定された大きさ＋マージンで表示するコンテナビュー
     */
    export let margin:Number=0  // px
    export let width:Number
    export let height:Number
    $: console.log(`${width}x${height}`)
</script>
<div class="flex-box-view"
     style:width="{width-margin*2}px"
     style:height="{height-margin*2}px"
     style:margin="{margin}px"
    >
    <slot/>
</div>

<style lang="sass">
    .flex-box-view
      background-color: #ff3e00
      display: flex
</style>
