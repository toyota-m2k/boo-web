<script lang="ts">
    import { onMount } from 'svelte';
    import {MediaFile} from "./store/BooClient";
    import { serverListCommand } from "./store/Settings"

    export let media:MediaFile|undefined

    let player
    function togglePlay(event:Event) {
        if(player.paused) {
            player.play()
        } else {
            player.pause()
        }
    }
</script>

<div class="player-view">
    {#if media}
    <video
        bind:this={player}
        src={media.url()}
        on:mousedown={togglePlay}
        autoplay
        >
        <track kind="captions">
    </video>
    {/if}
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