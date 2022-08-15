import {composeListCommand, serverItemCommand, serverUrl} from './Settings'
import {Subject} from 'rxjs'

export class MediaFile {
    duration: number;
    type: string;
    length: number;
    mediaId: string;
    title: string;

    constructor(mediaId:string, type:string, title:string, length:number, duration:number) {
        this.mediaId = mediaId
        this.type = type
        this.length = length
        this.title = title
        this.duration = duration
    }

    public mimeType():string {
        switch(this.type) {
            case "mp3": return "audio/mpeg"
            case "mp4": return "video/mp4"
            default: return "video/mp4"
        }
    }
    public isVideo():boolean {
        return this.type=="mp3"
    }

    public url():string {
        return `${serverItemCommand}?id=${this.mediaId}`
    }
}

let currentUrl:String|null = null

export const mediaList = new Subject<Array<MediaFile>>()
export const error = new Subject<string>()

export function retrieveMediaList() {
    let url:string // = serverUrl + "ytplayer/list/" // composeListCommand()
    try {
        url = composeListCommand()
    } catch(e) {
        console.error(e)
        url = serverUrl + "ytplayer/list/"
    }
    if(url==currentUrl) {
        return
    }
    console.log(`loading: ${url}`)
    fetch(url)
        .then(response=> {
            return response.json()
        })
        .then(json=>{
            // console.log(json)
            // const medias = json.list.map(v=>{
            //     new MediaFile(v.path, v.ext, v.title, v.length, v.duration);
            // });
            const medias = []
            for(let i=0,ci=json.list.length; i<ci;i++) {
                let v = json.list[i]
                medias.push(new MediaFile(v.id, v.type, v.name, v.size, v.duration))
            }
            currentUrl = url
            mediaList.next(medias)
            return Promise.resolve()
        })
        .catch(reason=>{
            currentUrl = null
            console.error(reason)
            error.next(reason.toString())
        })
}

