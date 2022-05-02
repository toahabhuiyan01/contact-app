import { defaultStorageKey as dsKey } from "./GlobalConstants"

export function setDataStorage(data: string, key?: string) {
    localStorage.setItem(key || dsKey, data)
}
 
export function getDataStorage(key?: string): string | any {
    return localStorage.getItem(key ? key : dsKey)
}
 
export function removeDataStorage(key?: string): string | any {
    localStorage.removeItem(key || dsKey)
}

