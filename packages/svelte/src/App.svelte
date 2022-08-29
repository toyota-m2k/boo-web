<script lang="ts">
  import NavBar from "./NavBar.svelte";
  import BodyView from "./BodyView.svelte";
  import MediaListView from "./MediaListView.svelte";
  import PlayerView from "./PlayerView.svelte";
  import {MediaFile, retrieveMediaList, mediaList} from "./store/BooClient";
  import {onMount} from 'svelte';
  import {fullscreen} from "./store/Settings.js";
  import { fade } from 'svelte/transition';

  export let margin = "8px"
  // let clientWidth
  // let clientHeight
  // let offsetWidth
  // let offsetHeight
  let rawNavBarHeight
  let navBarHeight
  // let windowInnerWidth
  // let windowInnerHeight
  // let windowOuterWidth
  // let windowOuterHeight
  // $: console.log(`client: ${clientWidth} x ${clientHeight} / offset ${offsetWidth} x ${offsetHeight}`)
  // $: console.log(`window inner ${windowInnerWidth} x ${windowInnerHeight} / outer ${windowOuterWidth} x ${windowOuterHeight}`)
  // $: console.log(`BodyView nav bar height=${rawNavBarHeight}`)

  let currentMedia:MediaFile

  onMount(()=> {
    retrieveMediaList()
  })

  $: if($fullscreen) {
    navBarHeight = 0
    console.log(`fullscreen: ${navBarHeight}`)
  } else if (rawNavBarHeight) {
    navBarHeight = rawNavBarHeight
    console.log(`not full: ${navBarHeight}`)
  }


  function incrementIndex(inc:number):number {
    if(!currentMedia) return -1
    let list = $mediaList
    if(!list || list.length==0) -1
    let index = list.indexOf(currentMedia)
    if(index<0) return -1
    index += inc
    if(index<0 || list.length<=index) return -1
    return index
  }

  export function next() {
    let index = incrementIndex(1)
    if(index<0) {
      return
    }
    currentMedia = $mediaList[index]
  }
  export function prev() {
    let index = incrementIndex(-1)
    if(index<0) {
      return
    }
    currentMedia = $mediaList[index]
  }

</script>

<div class="app-root" style:--margin={margin}>
  {#if !$fullscreen}
    <div class="nav-bar-pane" bind:clientHeight={rawNavBarHeight} transition:fade>
      <NavBar currentTitle={currentMedia?.title}/>
    </div>
  {/if}
  <div class="client-pane" style:--nav-var-height="{navBarHeight}px">
    <BodyView>
      <MediaListView slot="drawer" mediaList={$mediaList} bind:currentMedia={currentMedia}/>
      <PlayerView slot="main" media="{currentMedia}" on:prev={prev} on:next={next}/>
    </BodyView>
  </div>
</div>

<style lang="sass">
  // theming
  .app-root
      --mdc-theme-primary: #1100ff
      --mdc-theme-secondary: #4cc418
      --mdc-theme-background: #fff
      --mdc-theme-surface: #fff
      --mdc-theme-error: #b73bff
      --mdc-theme-on-primary: #fff
      --mdc-theme-on-secondary: #fff
      --mdc-theme-on-surface: #000
      --mdc-theme-on-error: #fff
      --mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87)
      --mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54)
      --mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38)
      --mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38)
      --mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38)
      --mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87)
      --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54)
      --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38)
      --mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38)
      --mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38)
      --mdc-theme-text-primary-on-dark: white
      --mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7)
      --mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5)
      --mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5)
      --mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5)

  .app-root
    display: flex
    flex-direction: column
    //background-color: darkblue
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