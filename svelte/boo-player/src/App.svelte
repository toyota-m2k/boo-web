<script lang="ts">
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import NavBar from "./NavBar.svelte";
  import BodyView from "./BodyView.svelte";
  import IconButton from '@smui/icon-button';
  import MediaListView from "./MediaListView.svelte";
  import PlayerView from "./PlayerView.svelte";
  import {MediaFile} from "./store/BooClient";
  import { tick } from 'svelte';

  export let margin = "8px"
  let clientWidth
  let clientHeight
  let offsetWidth
  let offsetHeight
  let navBarHeight
  // let windowInnerWidth
  // let windowInnerHeight
  // let windowOuterWidth
  // let windowOuterHeight
  // $: console.log(`client: ${clientWidth} x ${clientHeight} / offset ${offsetWidth} x ${offsetHeight}`)
  // $: console.log(`window inner ${windowInnerWidth} x ${windowInnerHeight} / outer ${windowOuterWidth} x ${windowOuterHeight}`)
  $: console.log(`BodyView nav bar height=${navBarHeight}`)
  let currentMedia:MediaFile

  function mediaChanged(event) {
    // currentMedia = null
    // tick()
    currentMedia = event.detail.media
  }
</script>

<div class="app-root" style:--margin={margin}>
  <div class="nav-bar-pane" bind:clientHeight={navBarHeight}>
    <NavBar/>
  </div>
  <div class="client-pane" style:--nav-var-height="{navBarHeight}px">
    <BodyView>
      <MediaListView slot="drawer" on:media_selected={mediaChanged}/>
      <PlayerView slot="main" media="{currentMedia}"/>
    </BodyView>
  </div>
</div>

<style lang="sass">
  .app-root
    display: flex
    flex-direction: column
    background-color: darkblue
    --max-height: calc(100vh - var(--margin)*2)
    --max-width: calc(100vw - var(--margin)*2)
    height: var(--max-height)
    width: var(--max-width)
    max-height: var(--max-height)
    max-width: var(--max-width)
    margin: var(--margin)

    .client-pane
      --client-max-height: calc(var(--max-height) - var(--nav-var-height))
      display: flex
      height: var(--client-max-height)

</style>