import {
    Button,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    FormControlLabel, IconButton,
    Radio,
    RadioGroup, Slider, Stack, SvgIcon,
    Typography,
} from "@mui/material";
import * as Icons from "@mui/icons-material"
import React, {ChangeEvent, useEffect, useState} from "react";
import {composeListCommand, Mark, popCurrentSettings, pushCurrentSettings, Rating, SourceType} from "../store/Settings";

export interface SettingDialogProp {
    open:boolean,
    onComplete:()=>void
}

function MarkIcon(prop:{mark:Mark, on:boolean}) {
    return prop.on ? (prop.mark.iconOn) : (prop.mark.iconOff)
}

export default function SettingDialog(prop:SettingDialogProp) {
    // const [dirty,setDirty] = useState(false)
    // const [ok, complete] = useState(false)
    const [sourceType, setSourceType] = useState<SourceType>(SourceType.activeSourceType)
    // const [marks, setMarks] = useState(Mark.marks.map((it)=>it.clone()))
    const [marks, setMarks] = useState(Mark.marks.map((v)=>v.clone()))
    const [rating, setRating] = useState<number>(Rating.ratingThreshold)

    function handleClose(ok?:boolean|undefined) {
        prop.onComplete()
        if(ok) {
            Mark.marks = marks
            Rating.ratingThreshold = rating
            SourceType.activeSourceType = sourceType
        }
    }

    function onSourceChange(e:ChangeEvent, c:string) {
        const t = SourceType.fromLabel(c)
        if(t) {
            setSourceType(t)
        }
    }

    function onMarkSelected(m:Mark) {
        const newMarks = [...marks]
        m.selected = !m.selected
        setMarks(newMarks)
    }

    function onRatingChanged(event:Event, value:number|number[]) {
        if(value) {
            setRating(value as number)
        }
    }

    return (
        <Dialog onClose={()=>handleClose()} open={prop.open}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6" noWrap component="div">
                    Source
                </Typography>
                <RadioGroup row value={sourceType.label} onChange={onSourceChange}>
                    {SourceType.types.map((it)=>{
                        return (<FormControlLabel value={it.label} control={<Radio />} label={it.label} key={it.label}/>)
                    })}
                </RadioGroup>
                <Typography variant="h6" noWrap component="div">
                    Mark
                </Typography>
                <Stack direction="row">
                    {Mark.marks.map(it=>
                        <IconButton aria-label={it.name} component="span" onClick={()=>onMarkSelected(it)}  color={it.selected ? "primary" : "default"}>
                            {React.createElement(Icons[(it.selected ? it.iconOn : it.iconOff ) || "Circle"])}
                        </IconButton>)}
                </Stack>
                <Typography variant="h6" noWrap component="div">
                    Rating
                </Typography>
                <Stack sx={{alignItems:'center'}} direction="row" justifyItems="flex-start">
                    <div  style={{width:'50px', display:'flex'}}>
                        <SvgIcon color="secondary">
                            <path d={Rating.ratingOf(rating)?.iconOff}/>
                        </SvgIcon>
                    </div>
                    <Slider min={1} max={5} value={rating} onChange={onRatingChanged}/>
                </Stack>

            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={()=>handleClose(true)}>
                    OK
                </Button>
                <Button onClick={()=>handleClose()} autoFocus>
                    CANCEL
                </Button>
            </DialogActions>
        </Dialog>
    )
}