import * as Icons from "@mui/icons-material"

export let serverUrl = "http://localhost:3500/"
if(document.documentURI.endsWith("/ytplayer/")) {
    serverUrl = document.documentURI
} else if(document.documentURI.endsWith("/ytplayer")) {
    serverUrl = document.documentURI + '/'
}

export const serverItemCommand = `${serverUrl}ytplayer/video`

// export const fullscreen = writable<Boolean>(false)

export class Rating {
    level:number
    name:string
    iconOn: string
    iconOff: string
    selected:boolean = false

    constructor(level:number, name:string, iconOn:string, iconOff:string) {
        this.level = level
        this.name = name
        this.iconOn = iconOn
        this.iconOff = iconOff
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
        "M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M6.76,8.82L7.82,7.76L8.88,8.82L9.94,7.76L11,8.82L9.94,9.88L11,10.94L9.94,12L8.88,10.94L7.82,12L6.76,10.94L7.82,9.88L6.76,8.82M6.89,17.5C7.69,15.46 9.67,14 12,14C14.33,14 16.31,15.46 17.11,17.5H6.89M17.24,10.94L16.18,12L15.12,10.94L14.06,12L13,10.94L14.06,9.88L13,8.82L14.06,7.76L15.12,8.82L16.18,7.76L17.24,8.82L16.18,9.88L17.24,10.94Z",
        "M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M16.18,7.76L15.12,8.82L14.06,7.76L13,8.82L14.06,9.88L13,10.94L14.06,12L15.12,10.94L16.18,12L17.24,10.94L16.18,9.88L17.24,8.82L16.18,7.76M7.82,12L8.88,10.94L9.94,12L11,10.94L9.94,9.88L11,8.82L9.94,7.76L8.88,8.82L7.82,7.76L6.76,8.82L7.82,9.88L6.76,10.94L7.82,12M12,14C9.67,14 7.69,15.46 6.89,17.5H17.11C16.31,15.46 14.33,14 12,14Z")

    static bad:Rating = new Rating(2, "Bad",
        "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5M14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23M15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11Z",
        "M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14Z")

    static normal:Rating = new Rating(3, "Normal",
        "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23M15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11Z",
        "M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z")

    static good:Rating = new Rating(4, "Good",
        "M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8M8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8M12,17.5C9.67,17.5 7.69,16.04 6.89,14H17.11C16.3,16.04 14.33,17.5 12,17.5Z",
        "M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z")
    static excellent:Rating = new Rating(5, "Excellent",
        "M18.9,18.94L15.94,16C15.76,15.79 15.55,15.5 15.55,15.05A1.3,1.3 0 0,1 16.85,13.75C17.19,13.75 17.53,13.89 17.77,14.15L18.91,15.26L20.03,14.13C20.27,13.89 20.61,13.75 20.95,13.75A1.3,1.3 0 0,1 22.25,15.05C22.25,15.39 22.11,15.73 21.87,15.97L18.9,18.94M17.46,19.62C15.72,21.1 13.47,22 11,22A10,10 0 0,1 1,12A10,10 0 0,1 11,2A10,10 0 0,1 21,12C21,12.09 21,12.17 20.95,12.25C20.21,12.25 19.5,12.55 18.97,13.07L18.9,13.14L18.84,13.09C18.32,12.55 17.6,12.25 16.85,12.25A2.8,2.8 0 0,0 14.05,15.05C14.05,15.78 14.34,16.5 14.87,17.03L17.46,19.62M13,9.5C13,10.3 13.7,11 14.5,11C15.3,11 16,10.3 16,9.5C16,8.7 15.3,8 14.5,8C13.7,8 13,8.7 13,9.5M9,9.5C9,8.7 8.3,8 7.5,8C6.7,8 6,8.7 6,9.5C6,10.3 6.7,11 7.5,11C8.3,11 9,10.3 9,9.5M12.94,15.18L14,14.12L11.88,12L10.82,13.06L11.88,14.12L10.82,15.18L11.88,16.24L10.82,17.3L11.88,18.36L14,16.24L12.94,15.18Z",
        "M9,9.5C9,10.3 8.3,11 7.5,11C6.7,11 6,10.3 6,9.5C6,8.7 6.7,8 7.5,8C8.3,8 9,8.7 9,9.5M16,9.5C16,10.3 15.3,11 14.5,11C13.7,11 13,10.3 13,9.5C13,8.7 13.7,8 14.5,8C15.3,8 16,8.7 16,9.5M14,14.12L11.88,12L10.82,13.06L11.88,14.12L10.82,15.18L11.88,16.24L10.82,17.3L11.88,18.36L14,16.24L12.94,15.18L14,14.12M16.85,13A2.05,2.05 0 0,0 14.8,15.05C14.8,15.62 15.03,16.12 15.4,16.5L18.9,20L22.4,16.5C22.77,16.13 23,15.61 23,15.05A2.05,2.05 0 0,0 20.95,13C20.4,13 19.87,13.23 19.5,13.6L18.9,14.2L18.3,13.61C17.93,13.23 17.4,13 16.85,13M15,18.92C13.82,19.6 12.46,20 11,20A8,8 0 0,1 3,12A8,8 0 0,1 11,4C15.26,4 18.73,7.33 19,11.5C19.58,11.19 20.26,11 20.95,11C20.45,5.95 16.18,2 11,2A10,10 0 0,0 1,12A10,10 0 0,0 11,22C13,22 14.88,21.4 16.45,20.38L15,18.92Z")

    static ratings = [this.dreadful, this.bad, this.normal, this.good, this.excellent]

    static ratingThreshold:number = 3
    private static pushedRatingThreshold = 0

    static ratingOf(level:number):Rating|undefined {
        return this.ratings.find(it=>it.level==level)
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
    iconOn: keyof typeof Icons
    iconOff: keyof typeof Icons
    selected:boolean = false
    constructor(id:number, name:string, iconOn:keyof typeof Icons, iconOff:keyof typeof Icons) {
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

    static markNone = new Mark(0, "None", "Circle", "Circle")
    static markStar = new Mark(1, "Star",
        "Star",
        "StarOutline")
    static markFlag= new Mark(2, "Flag",
        "Flag",
        "OutlinedFlag")
    static markHeart= new Mark(3, "Heart",
        "Favorite",
        "FavoriteBorder")

    static marks = [this.markStar, this.markFlag, this.markHeart]

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

    static fromLabel(label:string):SourceType|undefined {
        return this.types.find(it=>it.label===label)
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