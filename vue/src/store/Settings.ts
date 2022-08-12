import {retrieveMediaList} from "./BooClient";
import dc from "./DebugConfig.json"

export let serverUrl:string
if(import.meta.env.DEV) {
    serverUrl = dc.BooServer
} else {
    serverUrl = document.location.origin
}
if(!serverUrl.endsWith('/')) {
    serverUrl += '/'
}
export const serverItemCommand:string = `${serverUrl}ytplayer/video`

export function composeMediaUrl(mediaId:string):string {
    return `${serverItemCommand}?id=${mediaId}`
}

// export const fullscreen = writable<Boolean>(false)

export class Rating {
    level:number
    name:string
    icon: string
    selected:boolean = false

    constructor(level:number, name:string, icon:string) {
        this.level = level
        this.name = name
        this.icon = icon
    }

    // constructor(a:any, name?:string, iconOn?:string, iconOff?:string) {
    //     if(!name) {
    //         Object.assign(this, a)
    //     } else {
    //         this.level = a
    //         this.name = name
    //         this.iconOn = iconOn
    //         this.iconOff = iconOff
    //     }
    // }




    static dreadful:Rating = new Rating(1, "Dreadful",
        "mdi mdi-emoticon-dead-outline")

    static bad:Rating = new Rating(2, "Bad",
        "mdi mdi-emoticon-frown-outline")

    static normal:Rating = new Rating(3, "Normal",
        "mdi mdi-emoticon-happy-outline")

    static good:Rating = new Rating(4, "Good",
        "mdi mdi-emoticon-outline")

    static excellent:Rating = new Rating(5, "Excellent",
        "mdi mdi-emoticon-kiss-outline")

    static ratings = [this.dreadful, this.bad, this.normal, this.good, this.excellent]

    static ratingThreshold:number = 3
    private static pushedRatingThreshold = 0

    static ratingOf(level:number):Rating {
        return this.ratings.find(it=>it.level==level) ?? this.normal
    }

    static push() {
        this.pushedRatingThreshold = this.ratingThreshold
    }
    static pop() {
        if(!this.pushedRatingThreshold) return
        this.ratingThreshold = this.pushedRatingThreshold
        this.pushedRatingThreshold = 0
    }
}

export class Mark {
    id:number
    name:string
    iconOn: string
    iconOff: string
    selected:boolean = false
    constructor(id:number, name:string, iconOn:string, iconOff:string) {
        this.id = id
        this.name = name
        this.iconOn = iconOn
        this.iconOff = iconOff
    }

    clone():Mark {
        const src = this;
        const r = new Mark(src.id, src.name, src.iconOn, src.iconOff)
        r.selected = src.selected
        return r;
    }

    static markNone = new Mark(0, "None", "mdi-circle-small", "mdi-circle-small")
    static markStar = new Mark(1, "Star",
        "mdi-star",
        "mdi-star-outline")
    static markFlag= new Mark(2, "Flag",
        "mdi-flag",
        "mdi-flag-outline")
    static markHeart= new Mark(3, "Heart",
        "mdi-heart",
        "mdi-heart-outline")

    static marks:Array<Mark> = [this.markStar, this.markFlag, this.markHeart]

    static getMarksAsQueryValue():string {
        return this.marks.reduce((acc,it)=>{
            if(it.selected) {
                if (acc.length > 0) acc += "."
                return acc + (it.id?.toString())
            } else return acc
        }, "")
    }

    static setMarks(m:Array<Mark>):void {
        this.marks = m
    }

    static fromName(label:string):Mark|undefined {
        return this.marks.find(it=>it.name===label)
    }


    private static pushed?:Array<boolean>

    static push() {
        this.pushed = this.marks.map (it=> it.selected)
    }

    static pop() {
        if(!this.pushed) return
        this.pushed.forEach((it,i)=>{
            this.marks[i].selected = it
        })
        delete this.pushed
    }
}

export class SourceType {
    id:number
    label:string

    constructor(id:number, label:string) {
        this.id = id
        this.label = label
    }

    static all = new SourceType(0, "All")
    static listed = new SourceType(1, "Listed")
    static selected = new SourceType(2, "Selected")

    static types = [this.all, this.listed, this.selected]

    // static fromLabel(label:string):SourceType {
    //     return this.types.find(it=>it.label===label) ?? this.all;
    // }
    static fromId(id:number):SourceType {
        return this.types.find(it=>it.id===id) ?? this.all;
    }

    static activeSourceType:SourceType = this.all

    private static pushedSourceType?:SourceType

    static push() {
        this.pushedSourceType = this.activeSourceType
    }
    static pop() {
        if(!this.pushedSourceType) return
        this.activeSourceType = this.pushedSourceType
        delete this.pushedSourceType
    }

}

export function pushCurrentSettings() {
    Rating.push()
    Mark.push()
    SourceType.push()
}

export function popCurrentSettings() {
    Rating.pop()
    Mark.pop()
    SourceType.pop()
}

export function applySettings(sourceTypeId:number, ratingThreshold:number) {
    SourceType.activeSourceType = SourceType.fromId(sourceTypeId)
    Rating.ratingThreshold = ratingThreshold
    pushCurrentSettings()
    retrieveMediaList()
}

export function composeListCommand():string {
    const sp = new URLSearchParams()
    if(SourceType.activeSourceType.id!=SourceType.all.id) {
        sp.append("s", SourceType.activeSourceType.id.toString())
    }
    if(Rating.ratingThreshold!=Rating.normal.level) {
        sp.append("r", Rating.ratingThreshold.toString())
    }
    let marks = Mark.getMarksAsQueryValue()
    if(marks.length>0) {
        sp.append("m", marks)
    }

    let url = serverUrl + "ytplayer/list/"
    const query = sp.toString()
    if(query.length>0) {
        url = url + '?' + query
    }
    return url

}