<script lang="ts">
    import Drawer, { AppContent, Content } from '@smui/drawer';
    import List, { Item, Text } from '@smui/list';

    let clicked = 'nothing yet';
</script>

<svelte:body style:height="100%"/>

<div id="container">
    <div id="header">
        <h1>header</h1>
    </div>

    <div id="drawer">
    </div>

    <div id="main">

    </div>

    <div id="footer">
        <h1>footer</h1>
    </div>
</div>

<style lang="sass">

  #container
    width: 100%
    height: 100%
    #header
      background-color: lightpink
      width: 100%
    #drawer
      float: left
      height: 100%
      width: 30%
      background-color: aqua
    #main
      float: right
      width: 70%
      height: 100%
      background-color: chartreuse
    #footer
      width: 100%
      clear: both
      background-color: darkgoldenrod
</style>