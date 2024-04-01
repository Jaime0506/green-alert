import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MarkerType } from "../../types";

interface initialStateProp {
    markers: MarkerType[] | undefined
    loaded: boolean
    active: MarkerType | undefined
    isLoading: boolean
}

const initialState: initialStateProp = {
    markers: [],
    loaded: false,
    active: undefined,
    isLoading: false
}

const IncidentsSlice = createSlice({
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
            state.active = undefined
        },

        deleteActiveIncident: (state) => {
            state.markers = state.markers?.filter((marker) => marker.id != state.active?.id)
            state.active = undefined
        },

        setIsLoading: (state) => {
            state.isLoading =  true
        },

        clearIsLoading: (state) => {
            state.isLoading = false
        }
    }
})

export const { loadIncidents, addIncident, setActiveIncident, updateIncident, clearActiveIncident, deleteActiveIncident, setIsLoading, clearIsLoading } = IncidentsSlice.actions
export default IncidentsSlice.reducer