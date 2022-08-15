import {Box, Slider} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {CloseFullscreen, OpenInFull, Pause, PlayArrow} from "@mui/icons-material";
import {SyntheticEvent} from "react";

interface ControlPanelProp {
    playing:boolean
    duration:number
    fullscreen:boolean
    currentTime:number
    onSeeked:(time:number)=>void
    onPlay:(play:boolean)=>void
    onFullscreen:(full:boolean)=>void
}

interface SliderObject {
    value:number
}

export default function ControlPanel(prop:ControlPanelProp) {
    function onSeeked(event:Event, value:number|number[]) {
        prop.onSeeked(value as number)
        // prop.onSeeked((event.target as unknown as SliderObject)?.value ?? 0)
    }

    return (
        <Stack sx={{background:'rgba(255,200,150,0.6)', alignItems:'center'}} direction="row" justifyContent="flex-start">
            {!prop.playing && <IconButton aria-label="play" onClick={ ()=> prop.onPlay(true) }>
                <PlayArrow/>
            </IconButton>}
            {prop.playing && <IconButton aria-label="Pause" onClick={ ()=> prop.onPlay(false) }>
                <Pause/>
            </IconButton>}
            <Slider aria-label="seek" min={0} max={prop.duration} value={prop.currentTime} onChange={ onSeeked }/>

            {!prop.fullscreen && <IconButton aria-label="Fullscreen">
                <OpenInFull/>
            </IconButton>}
            {prop.fullscreen && <IconButton aria-label="Close Fullscreen">
                <CloseFullscreen/>
            </IconButton>}
        </Stack>
    )
}