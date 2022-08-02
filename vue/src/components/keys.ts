import {InjectionKey, Ref} from "vue";

export const providerKeyFullscreen:InjectionKey<Ref<boolean>> = Symbol()
export const providerKeyPrev:InjectionKey<()=>void> = Symbol()
export const providerKeyNext:InjectionKey<()=>void> = Symbol()
