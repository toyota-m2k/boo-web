import {Subject} from "rxjs";

export class PlayingItemInfo {
    duration = new Subject<number>()
    currentTime = new Subject<number>()
    playing = new Subject<boolean>()

    reset() {
        this.duration.next(0)
        this.currentTime.next(0)
        this.playing.next(false)
    }
}

export const playingItemInfo = new PlayingItemInfo()
