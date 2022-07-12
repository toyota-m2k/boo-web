import * as React from 'react'
import {MediaFile, mediaList as observableMediaList} from "./store/BooClient";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface MediaListViewProp {
    mediaList:Array<MediaFile>
    currentMedia:MediaFile|null
    onSelected:(v:MediaFile|null)=>void
}

export default function MediaListView(prop:MediaListViewProp) {
    console.log("MediaLiatView rendered")

    function onItemClicked(v:MediaFile) {
        prop.onSelected?.(v)
    }

    return <List dense={false}>
            { prop.mediaList.map((v:MediaFile)=> {
                // console.log(v.mediaId + ", current="+prop.currentMedia?.mediaId + ` (${prop.currentMedia?.mediaId==v.mediaId})`)
                return (
                    <ListItem sx={{
                        backgroundColor: "#FFFFa0",
                        ...(prop.currentMedia?.mediaId==v.mediaId && {backgroundColor: "#a0FFFF"})
                        }} key={v.mediaId}>
                        <ListItemButton onClick={()=>onItemClicked(v)}>
                            <ListItemText
                                primary={v.title}
                            />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
}