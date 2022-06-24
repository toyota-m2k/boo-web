import { writable, readable } from 'svelte/store'
import type {Readable} from "svelte/types/runtime/store";
import { serverItemCommand } from './Settings'

export class MediaFile {
    duration: number;
    type: string;
    length: number;
    id: string;
    title: string;

    constructor(id:string, type:string, title:string, length:number, duration:number) {
        this.id = id
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

    public url():String {
        return `${serverItemCommand}?id=${this.id}`
    }
}

export const mediaList = writable<Array<MediaFile>>([])
export const error = writable<string|null>(null)

export function retrieveMediaList(url:string) {
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


            mediaList.set(medias)
            return Promise.resolve()
        })
        .catch(reason=>{
            console.error(reason)
            error.set(reason.toString())
        })
}

export const currentMedia = writable<MediaFile|undefined>()

