<script lang="ts">
  import FlexBox from "./FlexBox.svelte";
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import NavBar from "./NavBar.svelte";
  import BodyView from "./BodyView.svelte";
  import IconButton from '@smui/icon-button';

  let clientWidth
  let clientHeight
  let offsetWidth
  let offsetHeight
  // let windowInnerWidth
  // let windowInnerHeight
  // let windowOuterWidth
  // let windowOuterHeight
  $: console.log(`client: ${clientWidth} x ${clientHeight} / offset ${offsetWidth} x ${offsetHeight}`)
  // $: console.log(`window inner ${windowInnerWidth} x ${windowInnerHeight} / outer ${windowOuterWidth} x ${windowOuterHeight}`)
</script>

<!--<svelte:window bind:innerWidth={windowInnerWidth} bind:innerHeight={windowInnerHeight} bind:outerWidth={windowOuterWidth} bind:outerHeight={windowOuterHeight}/>-->
<div style:width="100%" style:height="100%" bind:clientWidth bind:clientHeight bind:offsetWidth bind:offsetHeight>
  <FlexBox margin="8" width={clientWidth} height={clientHeight}>
    <div class="root-box">
      <NavBar/>
      <BodyView/>
    </div>
  </FlexBox>
</div>

<style lang="sass">
  .root-box
    display: flex
    flex-direction: column
    background-color: cornflowerblue
    flex-grow: 1
</style>