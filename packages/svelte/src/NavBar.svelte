<script lang="ts">
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import SettingDialog from "./dialog/SettingDialog.svelte";
    export let currentTitle = "untitled"

    let openSettingDialog:Boolean = false
</script>

<TopAppBar
        variant="static"
        dense=true
        color={'primary'}
        >
    <Row>
        <Section>
            <IconButton class="material-icons">menu</IconButton>
            <Title>WebBoo {currentTitle ? `- ${currentTitle}`:''}</Title>
        </Section>
        <Section align="end" toolbar>
            <IconButton class="material-icons" aria-label="Settings" on:click={()=>openSettingDialog=true}
            >settings</IconButton
            >
        </Section>
    </Row>
</TopAppBar>

<SettingDialog bind:openSettingDialog={openSettingDialog}/>