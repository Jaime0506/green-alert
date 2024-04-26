import { supabase } from './supabase'

import { v4 as uuidv4 } from 'uuid'
// import type { FileBOdy } from '@supabase/storage-js'

export const uploadFile = async (file: File, uid: string, active_id: string) => {
    const { data, error } = await supabase.storage.from("test").upload(uid + "/" + active_id + "/" + uuidv4(), file)

    if (error) {
        console.log("Ha ocurrido un errro", error)
        return false
    }

    return data.path
}

export const fetchFiles = async () => {

}