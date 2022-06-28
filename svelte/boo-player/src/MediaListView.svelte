<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import {MediaFile} from "./store/BooClient";
    import { serverListCommand } from "./store/Settings"
    import List, { Item, Separator, Text, PrimaryText, SecondaryText } from '@smui/list';

    export let currentMedia:MediaFile = null
    export let mediaList:Array<MediaFile>

</script>

<div class="media-list-view">
    <List>
    {#each mediaList as media (media.id)}
        <Item
            selected={currentMedia===media}
            on:SMUI:action={() => (currentMedia = media)}
            >
            <Text>
                <PrimaryText>{media.title}</PrimaryText>
                <SecondaryText>{`${media.length} / ${media.duration}`}</SecondaryText>
            </Text>
        </Item>
        <Separator/>
    {/each}
    </List>
</div>

<style lang="sass">
    .media-list-view
      display: flex
      height: 100%
      width: 100%
      --max-height: calc(100%)
      max-height: var(--max-height)
      overflow-y: auto
      overflow-x: auto
      background-color: darksalmon
      box-sizing: border-box
</style>