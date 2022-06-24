<script lang="ts">
    /**
     * 左右に分割するビュー
     * もうすこし頑張れば上下にも分割できると思うが。。。
     */
    export let minDrawerWidth = 100
    export let maxDrawerRatio = 0.8
    export let drawerWidth = 400
    export let trackerWidth=5
    let viewWidth:Number
    let dragging:Boolean = false
    let orgDrawerWidth:Number = 0
    let clickX:Number = 0
    let tracker;
    function onPointerDown(e:PointerEvent) {
        dragging = true
        orgDrawerWidth = drawerWidth
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
            // console.log("mouse move with tracker")
            let w = orgDrawerWidth + (e.pageX - clickX)
            drawerWidth = Math.max(minDrawerWidth, Math.min(w, viewWidth*maxDrawerRatio))
        }
    }
</script>

<div class="content-view" bind:clientWidth={viewWidth}>
    <div class="drawer" style:width="{drawerWidth}px">
        <slot name="drawer"/>
    </div>

    <div class="tracker" style:width="{trackerWidth}px" bind:this={tracker} on:pointerdown|preventDefault={onPointerDown} on:pointerup|preventDefault={onPointerUp}></div>
    <div class="main">
        <slot name="main"/>
    </div>
</div>

<style lang="sass">
  .content-view
    display: flex
    background-color: aqua
    flex-direction: row
    height: 100%
    width: 100%
  .tracker
    cursor: col-resize
  .drawer
    background-color: blueviolet
    height: 100%
  .main
    background-color: darkcyan
    height: 100%
    flex-grow: 1
</style>