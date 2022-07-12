import {MediaFile} from "./store/BooClient";
import {SyntheticEvent, useRef, useState} from "react";
import {Box, duration} from "@mui/material";
// import {PlayingItemInfo, playingItemInfo} from "./store/PlayingItemInfo";
import ControlPanel from "./ControlPanel";
import { styled, useTheme } from '@mui/material/styles';
import { Transition } from 'react-transition-group'

const Player = styled('video')(({theme})=>({
    width: '100%'
}));

// const Panel = styled(ControlPanel)(({theme})=>({
//     position: 'absolute',
//     bottom: '7px',      // <video>の下に、謎の7px のマージンができる。
//     width: '100%',
// }));

interface PlayerViewProp {
    mediaFile:MediaFile|null
}

const Dummy = styled('div')(({theme})=>({
    height: '300px',
    width: '100%',
    backgroundColor: 'green'
}))

function hoge() {
    const [duration, setDuration] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [fullscreen, setFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [panelVisible, showPanel] = useState(false)

    return <Box>
        {playing && <div/>}
    </Box>
}

export default function PlayerView(prop:PlayerViewProp) {
    const videoElement = useRef<HTMLVideoElement>(null)

    function togglePlay() {
        const player = videoElement?.current
        if(player) {
            if(player.paused) {
                player.play().then(r => {
                })
            } else {
                player.pause()
            }
        }
    }


    const url:string|undefined = prop.mediaFile?.url()

    function onPlay(e:SyntheticEvent) {
        // console.log("onPlay:"+e)
        // playingItemInfo.playing.next(true)
        setPlaying(true)
    }
    function onPause(e:SyntheticEvent) {
        // console.log("onPlay:"+e)
        // playingItemInfo.playing.next(false)
        setPlaying(false)
    }
    // function onProgress(e:SyntheticEvent) {
    //     console.log("onProgress:"+e)
    // }
    function onDurationChanged(e:SyntheticEvent) {
        // console.log("onDurationChanged:"+e)
        // playingItemInfo.duration.next((e.target as HTMLVideoElement).duration)
        setDuration((e.target as HTMLVideoElement).duration)
    }
    function onTimeUpdate(e:SyntheticEvent) {
        // console.log("onTimeUpdate:"+e)
        // playingItemInfo.currentTime.next(e.target.currentTime)
        setCurrentTime((e.target as HTMLVideoElement).currentTime)
    }
    // function onTimeUpdateCapture(e:SyntheticEvent) {
    //     console.log("onTimeUpdate:"+e)
    // }

    const fadeInOutStyles = {
        entering: { opacity: 1, transition: 'all 1s ease' },
        entered: { opacity: 1},
        exiting: { opacity: 0, transition: 'all 1s ease' },
        exited: { opacity: 0 },
        unmounted: {},
    }

    const [duration, setDuration] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [fullscreen, setFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [panelVisible, showPanel] = useState(false)

    function onSeeked(v:number) {
        // setCurrentTime(v)
        const player = videoElement?.current
        if(player) {
            player.currentTime = v
        }

    }
    function onFullscreen(v:boolean) {
        setFullscreen(v)
    }

    function onPlayFromControlPanel(play:boolean) {
        const player = videoElement?.current
        if(player) {
            if(player.paused && play) {
                player.play().then(play => {
                })
            } else if(!player.paused && !play) {
                player.pause()
            }
        }
    }

    if(url) {
        return (
            <Box sx={{position:'relative'}}
                onMouseEnter={()=>{showPanel(true)}}
                onMouseLeave={()=>{showPanel(false)}}
                >
                <Player
                    ref={videoElement}
                    src={url}
                    autoPlay
                    onMouseDown={togglePlay}
                    onPlay={onPlay}
                    onPause={onPause}
                    // onProgress={onProgress}
                    onDurationChange={onDurationChanged}
                    onTimeUpdate={onTimeUpdate}
                    // onTimeUpdateCapture={onTimeUpdateCapture}
                />
                <Box sx={{position:'absolute', bottom:'7px', width:'100%'}}>
                    <Transition in={panelVisible} timeout={1500}>
                        {(visible)=>
                            <div style={fadeInOutStyles[visible]}>
                                <ControlPanel playing={playing} fullscreen={fullscreen} currentTime={currentTime} duration={duration} onSeeked={onSeeked} onPlay={onPlayFromControlPanel} onFullscreen={onFullscreen}/>
                            </div>
                        }
                    </Transition>
                </Box>
            </Box>
        )
    } else {
        return <div/>
    }
}
