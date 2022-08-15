<script lang="ts">
    import IconButton, {Icon} from '@smui/icon-button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field';
    import { Svg } from '@smui/common/elements';
    import Slider from '@smui/slider';
    import {onMount, tick} from 'svelte';
    import { SourceType, Mark, Rating, pushCurrentSettings, popCurrentSettings } from '../store/Settings'
    import {retrieveMediaList} from "../store/BooClient";
    import classMap from '@smui/common'
    export let openSettingDialog
    // let sourceMode='All'
    // let [markStar, markFlag, markHeart] = []
    // let [ratingDreadful, ratingBad, ratingNormal, ratingGood, ratingExcellent] = [0,0,1,1,1]

    // let currentRatingIcon = Rating.normal.iconOff
    $: currentRatingIcon = Rating.ratingOf(Rating.ratingThreshold).iconOff

    let done:boolean = false

    onMount(()=>{
        console.log("dialog mounted.")
    })
    function onDone() {
        done = true
        retrieveMediaList()
    }

    function onDialogOpening() {
        console.log("setting dialog opening")
        done = false
        pushCurrentSettings()
    }

    function onDialogClosed() {
        console.log("setting dialog closed")
        if(!done) {
            popCurrentSettings()
        }
    }
</script>


<Dialog
    bind:open={openSettingDialog}
    aria-labelledby="title"
    aria-describedby="content"
    on:SMUIDialog:opening={onDialogOpening}
    on:SMUIDialog:closed={onDialogClosed}
    >
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <Title class="title">Settings</Title>
    <Content class="content">
        <div>
            <div>Source</div>
            {#each SourceType.types as option}
                <FormField>
                    <Radio bind:group={SourceType.activeSourceType} value={option} touch />
                    <span slot="label">{option.label}</span>
                </FormField>
            {/each}
        </div>
        <div>
            <div>Mark</div>
            <div class="mark_buttons">
                {#each Mark.marks as mark}
                    <IconButton aria-label={mark.name} toggle bind:pressed={mark.selected}>
                        <Icon class="material-icons dialog_check_off">{mark.iconOff}</Icon>
                        <Icon class="material-icons dialog_check_on" on>{mark.iconOn}</Icon>
                    </IconButton>
                {/each}
            </div>
        </div>
        <div>
            <div>Rating</div>
            <div class="rating_box">
                <div class="svg_icon">
                    <Icon class="dialog_check_on" component="{Svg}" viewBox="0 0 24 24">
                        <path fill="currentColor" d={currentRatingIcon}></path>
                    </Icon>
                </div>
                <div class="flex_grow">
                    <Slider
                        bind:value={Rating.ratingThreshold}
                        min={1}
                        max={5}
                        step={1}
                        tickMarks
                        input$aria-label="rating threshold"
                        />
                </div>
            </div>
        </div>
    </Content>
    <Actions>
        <Button on:click={onDone}>
            <Label>OK</Label>
        </Button>
        <Button on:click={() => {}}>
            <Label>Cancel</Label>
        </Button>
    </Actions>
</Dialog>

<style lang="sass">
  // IconButton をチェックボックスとして使うときの色を設定
  // IconButton に "color" という属性はあるが、無視されているっぽい。
  // mdc-xxx のようなクラスの色を変えてみたが、なんかうまくいかないので、専用のクラス(.dialog_check_on/off) を作ってみた。
  :global(.dialog_check_on)
    color: var(--mdc-theme-secondary)
  //:global(.dialog_check_off)
  //  color: var(--mdc-theme-secondary)
  .rating_box
    display: flex
    flex-direction: row
    align-items: center
  .svg_icon
    width: 30px
    height: 30px
  .flex_grow
    flex-grow: 1

</style>