<script lang="ts">
    import Slider from '@smui/slider';
    import IconButton, { Icon } from '@smui/icon-button';
    import Button, { Label } from '@smui/button';
    import {createEventDispatcher, onMount} from 'svelte';
    import {MediaFile} from "./store/BooClient";
    import { serverListCommand } from "./store/Settings"
    import {fullscreen} from "./store/Settings.js";
    const dispatch = createEventDispatcher()

    export let playing:Boolean
    export let duration:Number = 100
    export let position:Number = 0

    $: console.log(`playing = ${playing} duration=${duration}`)

    function nop() {}
</script>

<div class="control-panel-view">
    <IconButton class="material-icons" on:click={()=>dispatch("prev")}>skip_previous</IconButton>
    <IconButton on:click={()=>dispatch("toggle_play")} toggle bind:pressed={playing}>
        <Icon class="material-icons">play_arrow</Icon>
        <Icon class="material-icons" on>pause</Icon>
    </IconButton>
    <IconButton class="material-icons" on:click={()=>dispatch("next")}>skip_next</IconButton>
    <div style:width="100%">
        <Slider class="slider" min={0} max={duration} bind:value={position}/>
    </div>
    <IconButton class="material-icons" on:click={nop} toggle bind:pressed={$fullscreen}>
        <Icon class="material-icons">open_in_full</Icon>
        <Icon class="material-icons" on>close_fullscreen</Icon>
    </IconButton>

</div>

<style lang="sass">
    .control-panel-view
      display: flex
      flex-direction: row
      align-items: center
      //background-color: chartreuse
</style>