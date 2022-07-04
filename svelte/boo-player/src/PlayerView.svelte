<script lang="ts">
    import { onMount } from 'svelte';
    import {MediaFile} from "./store/BooClient";
    import { serverListCommand } from "./store/Settings"
    import ControlPanel from "./ControlPanel.svelte";
    import { fade, slide } from 'svelte/transition';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    export let media:MediaFile|undefined

    let player
    let duration
    let currentTime
    let ended
    let paused

    let showPanel:Boolean = false
    // let controlPanel

    let controlPanelOpacity = tweened(0, {duration:500, easing:cubicOut})

    $: if(showPanel) {
            $controlPanelOpacity = 1
            // controlPanel.animate(    // キーフレーム
            //     [
            //         {opacity: 0},
            //         {opacity: 1}
            //     ],
            //     // オプション
            //     {
            //         duration: 500,      // アニメが終了するまでの時間(ミリ秒)
            //         fill: 'forwards'    // アニメ完了後に最初の状態に戻さない
            //     }
            // )
        }
        else {
            $controlPanelOpacity = 0
            // controlPanel.animate(    // キーフレーム
            //     [
            //         {opacity: 1},
            //         {opacity: 0}
            //     ],
            //     // オプション
            //     {
            //         duration: 500,      // アニメが終了するまでの時間(ミリ秒)
            //         fill: 'forwards'    // アニメ完了後に最初の状態に戻さない
            //     }
            // )
        }

    function togglePlay() {
        if(player.paused) {
            player.play()
        } else {
            player.pause()
        }
    }

    function onMouseEnter() {
        showPanel = true
    }
    function onMouseLeave() {
        showPanel = false
    }
    $: console.log(`player paused ${paused}`)
</script>

<div class="player-view"
     on:mouseenter={onMouseEnter}
     on:mouseleave={onMouseLeave}
    >
    {#if media}
        <video
            bind:this={player}
            src={media.url()}
            on:mousedown={togglePlay}
            bind:duration
            bind:currentTime
            bind:paused
            bind:ended
            autoplay
            >
            <track kind="captions">
        </video>
        <!--
            最初は、アニメーションするために、transition:fade を指定して、
            {$if showPanel}...{/if} でcontrolPanelの表示・非表示を切り替えていたが、
            再生後（max/value: duration/position) に値が入った状態でSliderノードが作られると、MDCFoundation.ts の初期化（validation)で例外がでて動かなくなる。

            これを回避するため、{$if...} は使わず（つまり、必ずSliderノードが存在する状態で）、透過度を変えて非表示にする作戦に変更。
            まず、css で animation を作成して、fadein / fadeout クラスを、

            ```class={ if(showPanel) "fadein" else "fadeout" }```

            のように指定してみた。しかし、最初にロードされたときに１度アニメーションするだけで、その後は、単に opacity が（一瞬で）変化するだけだった。
            最後の手段として、Element.animate() 関数を使ってプログラム的にアニメーションするようにした。

            後になって、svelte には、transition （DOMノードの追加/削除で発動）以外に、tweened という、素のアニメーション機能があったことを思いだした。
            これを使うと、DOMノードを取り出す、イベントハンドラでanimate()を呼ぶ、などの処理が、style:opacityにtweened （controlPanelOpacity）をバインドするだけで実現できた。
         -->
        <div class={`control-panel`} style:opacity={$controlPanelOpacity}>
            <ControlPanel duration={duration} bind:position={currentTime} playing={!paused} on:toggle_play={togglePlay} on:next on:prev/>
        </div>
    {/if}
</div>

<style lang="sass">
    .player-view
      width: 100%
      position: relative
      box-sizing: border-box
      //background-color: darkslateblue
      video
        width: 100%
      .control-panel
        position: absolute
        bottom: 0
        width: 100%
    .fadeout
      animation: fadein-keyframes 3s ease 0s 1 forwards normal running
    .fadein
      animation: fadein-keyframes 3s ease 0s 1 backwards normal running
    @keyframes fadein-keyframes
      0%
        opacity: 1
      100%
        opacity: 0

</style>