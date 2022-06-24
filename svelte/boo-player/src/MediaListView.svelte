<script lang="ts">
    import { onMount } from 'svelte';
    import {MediaFile, mediaList, retrieveMediaList, currentMedia} from "./store/BooClient";
    import { serverListCommand } from "./store/Settings"
    import List, { Item, Separator, Text, PrimaryText, SecondaryText } from '@smui/list';
    onMount(()=> {
        retrieveMediaList(serverListCommand)
    })
    let selectedMedia:MediaFile|null = null
    $: currentMedia.set(selectedMedia)
</script>

<div class="media-list-view">
    <List>
    {#each $mediaList as media (media.id)}
        <Item
            selected={selectedMedia===media}
            on:SMUI:action={() => (selectedMedia = media)}
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