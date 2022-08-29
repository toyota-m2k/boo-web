<script lang="ts">
    import {fullscreen} from "./store/Settings.js";
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';


    /**
     * 左右に分割するビュー
     * もうすこし頑張れば上下にも分割できると思うが。。。
     */
    export let minDrawerWidth = 100
    export let maxDrawerRatio = 0.8
    // export let drawerWidth = 400
    export let trackerWidth=5
    let viewWidth = 800
    let dragging = false
    let orgDrawerWidth = 400
    let clickX = 0
    let tracker;
    const drawerWidth = tweened<number>(400, {
        duration: (from, to) => {
            return Math.abs(to-from)
        },
        easing: cubicOut
    })
    function onPointerDown(e:PointerEvent) {
        // if($fullscreen) {
        //     return
        // }
        dragging = true
        orgDrawerWidth = $drawerWidth
        // drawerWidth.update((v)=>{
        //     orgDrawerWidth=v;
        //     return v;})
        clickX = e.pageX
        console.log(`mouse down on tracker: button=${e.pointerId} click=${clickX}, org=${orgDrawerWidth}`)
        tracker.setPointerCapture(e.pointerId)
        tracker.addEventListener("pointermove", onPointerMove, false)
    }
    function onPointerUp(e:MouseEvent) {
        console.log(`mouse up: ${e.pageX}`)
        dragging = false
        tracker.removeEventListener("pointermove", onPointerMove, false)
    }
    // function onMouseLeave(e:MouseEvent) {
    //     console.log(`mouse leave: ${e.pageX}`)
    //     dragging = false
    // }
    function onPointerMove(e:MouseEvent) {
        if(dragging) {
            console.log(`mouse move with tracker org-w:${orgDrawerWidth} (${e.pageX})`)
            let w = orgDrawerWidth + (e.pageX - clickX)
            $drawerWidth = Math.max(minDrawerWidth, Math.min(w, viewWidth*maxDrawerRatio))
        }
    }

    fullscreen.subscribe((v)=>{
        if(v) {
            orgDrawerWidth = $drawerWidth
            $drawerWidth = 0
        } else {
            $drawerWidth = Math.max(minDrawerWidth, Math.min(orgDrawerWidth, viewWidth*maxDrawerRatio))
        }
    })
</script>

<div class="content-view" bind:clientWidth={viewWidth}>
    <div class="drawer" style:width="{$drawerWidth}px">
        <slot name="drawer"/>
    </div>
    {#if !$fullscreen}
      <div class="tracker" style:width="{trackerWidth}px" bind:this={tracker} on:pointerdown|preventDefault={onPointerDown} on:pointerup|preventDefault={onPointerUp}></div>
    {/if}
    <div class="main">
        <slot name="main"/>
    </div>
</div>

<style lang="sass">
  .content-view
    display: flex
    //background-color: aqua
    flex-direction: row
    height: 100%
    width: 100%
    --margin-top: 4px
    --max-height: calc(100% - var(--margin-top))
    .tracker
      cursor: col-resize
    .drawer
      margin-top: var(--margin-top)
      padding: 5px
      height: var(--max-height)
      border: 1px solid gray
      border-radius: 5px
      box-sizing: border-box
    .main
      margin-top: var(--margin-top)
      padding: 5px
      height: var(--max-height)
      border: 1px solid gray
      border-radius: 5px
      box-sizing: border-box
      background-color: black
      flex-grow: 1
</style>