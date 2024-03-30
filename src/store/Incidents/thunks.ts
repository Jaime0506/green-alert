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

export const uploadDataToDatabase = (dataToUpload: Object) => {
    return async () => {
        const { data, error } = await supabase.from('incidents_duplicate').insert(dataToUpload);

        console.log('Soy base de datoss')
        if (error) {
            console.error('Error subiendo datos:', error.message);
            return;
        }

        console.log('Se subio exitosamente:', data);
    };
};