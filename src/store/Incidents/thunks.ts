import { supabase } from "../../utils/supabase"

import type { AppDispatch } from "../store"
import type { MarkerType } from "../../types"
import { loadIncidents } from "."

export const fetchDataIncidents = () => {
    return async (dispatch: AppDispatch) => {

        const { data, error } = await supabase.from('incidents_duplicate').select()

        if (error) return console.log(error)

        const tempIncidents: MarkerType[] = []

        data.forEach((item: MarkerType) => {
            tempIncidents.push(item)
        })
        
        dispatch(loadIncidents(tempIncidents))
    }
}