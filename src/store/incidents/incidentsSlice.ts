import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IncidentType, MarkerType } from "../../types";

interface initialStateProp {
    markers: MarkerType[] | undefined
    loaded: boolean
    active: MarkerType
    listIncidentsType: IncidentType[] | undefined
    isLoading: boolean
}

const initialState: initialStateProp = {
    markers: [],
    loaded: false,
    active: {
        active: false,
        id: "",
        incident_type: 0,
        coords: {
            lat: 0,
            lng: 0,
        },
        images: []
    },
    listIncidentsType: [],
    isLoading: false
}

const incidentsSlice = createSlice({
    name: 'incidents',
    initialState,

    reducers: {
        loadIncidents: (state, actions: PayloadAction<MarkerType[]>) => {
            state.markers = actions.payload
            state.loaded = true
        },

        setActiveIncident: (state, action: PayloadAction<MarkerType>) => {
            state.active = action.payload
        },

        addIncident: (state, action: PayloadAction<MarkerType>) => {
            state.markers?.push(action.payload)
        },

        updateIncident: (state, action: PayloadAction<MarkerType>) => {
            state.markers = state.markers?.map((marker) => {
                if (marker.id === action.payload.id) {
                    return action.payload
                }
                return marker
            })

            state.isLoading = false
        },

        clearActiveIncident: (state) => {
            state.active = initialState.active
        },

        deleteActiveIncident: (state) => {
            state.markers = state.markers?.filter((marker) => marker.id != state.active?.id)
        },

        setIsLoading: (state) => {
            state.isLoading = true
        },

        clearIsLoading: (state) => {
            state.isLoading = false
        },

        loadIncidentsTypes: (state, action: PayloadAction<IncidentType[]>) => {
            state.listIncidentsType = action.payload
        },

        addImage: (state, action: PayloadAction<string[]>) => {
            state.active.images = [...state.active.images, ...action.payload]
            state.isLoading = false
        },

        deleteIncident: (state, action:  PayloadAction<string>) => {
            state.markers = state.markers?.filter(marker => marker.id != action.payload)
        }
    }
})

export const {
    loadIncidents, 
    addIncident, 
    setActiveIncident, 
    updateIncident, 
    clearActiveIncident, 
    deleteActiveIncident, 
    setIsLoading, 
    clearIsLoading, 
    loadIncidentsTypes,
    addImage,
    deleteIncident
} = incidentsSlice.actions

export default incidentsSlice.reducer