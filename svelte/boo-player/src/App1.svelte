<script lang="ts">
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
</script>

<div class="top-vertical-container">
    <TopAppBar
            variant="static"
            dense=true
            color={'primary'}
    >
        <Row>
            <Section>
                <IconButton class="material-icons">menu</IconButton>
                <Title>Static</Title>
            </Section>
            <Section align="end" toolbar>
                <IconButton class="material-icons" aria-label="Download"
                >file_download</IconButton
                >
                <IconButton class="material-icons" aria-label="Print this page"
                >print</IconButton
                >
                <IconButton class="material-icons" aria-label="Bookmark this page"
                >bookmark</IconButton
                >
            </Section>
        </Row>
    </TopAppBar>

    <div class="top-horizontal-container">
        <div class="drawer">

        </div>
        <div class="main">

        </div>
    </div>

</div>

<style lang="sass">
  .top-vertical-container
    display: flex
    background-color: lightpink
    width: 100%
    height: 100%
    align-items: flex-start
    flex-direction: column

    TopAppBar
      align-self: flex-start

  .top-horizontal-container
    width: 100%
    background-color: aquamarine
    flex-grow: 1
    display: flex
    flex-direction: row

  .drawer
    background-color: chartreuse
    flex-grow: 1

  .main
    background-color: cornflowerblue
    flex-grow: 3

  .top-app-bar-container
    height: 100%
    border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1))
    background-color: var(--mdc-theme-background, #fff)
    overflow: auto
    display: inline-block

  @media (max-width: 480px)
    .top-app-bar-container
      margin-right: 0

  .flexy
    display: flex
    flex-wrap: wrap

  .flexor
    display: inline-flex
    flex-direction: column

  .flexor-content
    flex-basis: 0
    height: 0
    flex-grow: 1
    overflow: auto

</style>


