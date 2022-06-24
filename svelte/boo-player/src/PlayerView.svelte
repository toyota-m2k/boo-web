<script lang="ts">
    import { onMount } from 'svelte';
    import {MediaFile, currentMedia} from "./store/BooClient";
    import { serverListCommand } from "./store/Settings"
    let paused=false
    function togglePlay(event:Event) {
        paused = !paused
    }
</script>

<div class="player-view">
    <video
        src={$currentMedia?.url() ?? ""}
        on:mousedown={togglePlay}
        bind:paused
        >
        <track kind="captions">
    </video>
</div>

<style lang="sass">
    .player-view
      height: 100%
      width: 100%
      box-sizing: border-box
      background-color: darkslateblue
      video
        width: 100%


</style>