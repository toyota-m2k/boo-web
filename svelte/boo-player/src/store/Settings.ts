import { writable, readable } from 'svelte/store'

export const serverUrl = "http://localhost:3500/"
export const serverListCommand = `${serverUrl}ytplayer/list`
export const serverItemCommand = `${serverUrl}ytplayer/video`