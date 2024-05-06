import { supabase } from "../../utils/supabase";
import { addImage, clearActiveIncident, clearIsLoading, deleteActiveIncident, loadIncidents, loadIncidentsTypes, setIsLoading, updateIncident } from ".";

import { handleToToastify, uploadFile } from "../../utils";

import type { AppDispatch, RootState } from "../store";
import type { MarkerType, IncidentType } from "../../types";

export const fetchDataIncidentTypes = () => {
    return async (dispatch: AppDispatch) => {
        const { data, error } = await supabase.from("incident_type").select()

        if (error) return console.log(error);

        const tempIncidentsTypes: IncidentType[] = [];

        data.forEach((item: IncidentType) => {
            tempIncidentsTypes.push(item);
        });

        dispatch(loadIncidentsTypes(tempIncidentsTypes))
    }
}

export const fetchDataIncidents = () => {
    return async (dispatch: AppDispatch) => {
        const { data, error } = await supabase.from("incidents_duplicate").select();

        if (error) return console.log(error);

        const tempIncidents: MarkerType[] = [];

        data.forEach((item: MarkerType) => {
            tempIncidents.push(item);
        });

        dispatch(loadIncidents(tempIncidents));
    };
};

export const uploadDataToDatabase = (dataToUpload: MarkerType) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const { uid } = getState().auth
        const create_by = uid

        const data = {...dataToUpload, create_by}

        dispatch(setIsLoading())

        const { error } = await supabase
            .from("incidents_duplicate")
            .insert(data);

        if (error) {
            console.error("Error subiendo datos:", error.message);

            dispatch(clearIsLoading())
            dispatch(deleteActiveIncident())
            
            handleToToastify("upload", error)

            return;
        }

        dispatch(updateIncident(dataToUpload))
        dispatch(clearActiveIncident())

        handleToToastify("upload", error)
    };
};

export const updateDataToDatabase = (dataToUpdate: MarkerType) => {
    return async (dispatch: AppDispatch) => {
        
        dispatch(setIsLoading())

        const { error } = await supabase
            .from("incidents_duplicate")
            .update(dataToUpdate)
            .eq("id", dataToUpdate.id);

        if (error) {
            console.error("Error subiendo datos:", error.message);

            dispatch(clearIsLoading())
            dispatch(clearActiveIncident())

            handleToToastify("update", error)

            return;
        }

        dispatch(updateIncident(dataToUpdate))
        dispatch(clearActiveIncident())

        handleToToastify("update", error)
    };
};

export const uploadImages = (files: FileList) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        
        dispatch(setIsLoading())

        const { auth, incidents } = getState()

        const { active } = incidents
        const { uid } = auth

        if (!uid) {
            console.log("No existe una sesion iniciada")
            dispatch(clearIsLoading())

            return 
        }

        if (!(active?.id.length > 0)) {
            console.log("No existe un incidente activo")
            dispatch(clearIsLoading())
        }

        const updateFilePromise: Promise<string>[] = []

        for (const file of files) {
            updateFilePromise.push(uploadFile(file, uid, active.id))
        }

        const imagesPath = await Promise.all(updateFilePromise)
        
        dispatch(addImage(imagesPath))
    }
}

export const cancelActiveIncident = (active: MarkerType) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const { uid } = getState().auth

        if (!uid) return console.log("No existe una sesion iniciada")
            
        if (!(active.images.length > 0)) return console.log("No es necesario obtener la lista del registro en el storage")

        const { data, error: error_list } = await supabase.storage.from("test").list(uid + "/" + active.id)
        
        if (error_list) {
            console.log(error_list)
            return
        }

        const filesPathToRemove = data.map((image) => `${uid}/${active.id}/${image.name}`)

        const { error } =  await supabase.storage.from("test").remove(filesPathToRemove) 
        
        if (error) {
            console.log(error)
            return
        }

        dispatch(deleteActiveIncident())
    }
}