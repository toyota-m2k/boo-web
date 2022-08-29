<script lang="ts">
    import Slider from '@smui/slider';
    import IconButton, { Icon } from '@smui/icon-button';
    import {createEventDispatcher} from 'svelte';
    import {fullscreen} from "./store/Settings.js";
    const dispatch = createEventDispatcher()

    export let playing = false
    export let duration = 100
    export let position = 0

    $: console.log(`playing = ${playing} duration=${duration}`)

    // function nop() {}
</script>

<div class="control-panel-view">
    <IconButton class="material-icons" on:click={()=>dispatch("prev")}>skip_previous</IconButton>
    <IconButton on:click={()=>dispatch("toggle_play")} toggle bind:pressed={playing}>
        <Icon class="material-icons">play_arrow</Icon>
        <Icon class="material-icons" on>pause</Icon>
    </IconButton>
    <IconButton class="material-icons" on:click={()=>dispatch("next")}>skip_next</IconButton>
    <div style:width="100%">
        <Slider class="slider" min={0} max={duration} bind:value={position} color="secondary"/>
    </div>
    <IconButton class="material-icons" toggle bind:pressed={$fullscreen} style="ink-color(#red)">
        <Icon class="material-icons">open_in_full</Icon>
        <Icon class="material-icons" on>close_fullscreen</Icon>
    </IconButton>

</div>

<style lang="sass">
    .control-panel-view
      // コントロールパネルは黒基調なので、黒の上に描いても見えるよう、テーマカラーの一部を置き換える。
      --mdc-theme-primary: #FF00ff
      --mdc-theme-secondary: #FFc418
      display: flex
      flex-direction: row
      align-items: center
      background-color: rgba(0,0,0,0.8)
    // アイコンボタンの色
    // mdc のクラスに直接色を設定する場合は、:global() で設定する。
    // ↑ローカルなクラスは、コンパイルすると、何やらidのような文字が追加されて、別のクラスになってしまう。
    :global(.mdc-icon-button)
      color: var(--mdc-theme-secondary)
</style>