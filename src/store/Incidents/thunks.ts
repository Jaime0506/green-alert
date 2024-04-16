import { supabase } from "../../utils/supabase";
import { clearActiveIncident, clearIsLoading, deleteActiveIncident, loadIncidents, loadIncidentsTypes, setIsLoading, updateIncident } from ".";

import type { AppDispatch } from "../store";
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
    return async (dispatch: AppDispatch) => {

        dispatch(setIsLoading())

        const { data, error } = await supabase
            .from("incidents_duplicate")
            .insert(dataToUpload);

        console.log("Soy base de datoss");
        if (error) {
            console.error("Error subiendo datos:", error.message);

            dispatch(clearIsLoading())
            dispatch(deleteActiveIncident())
            return;
        }

        console.log("Se subio exitosamente:", data);

        dispatch(updateIncident(dataToUpload))
        dispatch(clearActiveIncident())
    };
};

export const updateDataToDatabase = (dataToUpdate: MarkerType) => {
    return async (dispatch: AppDispatch) => {

        dispatch(setIsLoading())

        console.log('Subiennnndo')

        const { data, error } = await supabase
            .from("incidents_duplicate")
            .update(dataToUpdate)
            .eq("id", dataToUpdate.id);

        if (error) {
            console.error("Error subiendo datos:", error.message);
            dispatch(clearIsLoading())
            dispatch(clearActiveIncident())

            return;
        }

        dispatch(updateIncident(dataToUpdate))
        dispatch(clearActiveIncident())

        console.log("Se subio exitosamente:", data);
    };
};
