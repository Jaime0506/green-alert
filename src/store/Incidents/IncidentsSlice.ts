import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MarkerType, MarkerTypeRequired  } from "../../types";

interface initialStateProp {
    markers: MarkerTypeRequired[] | undefined
    loaded: boolean
}

const initialState: initialStateProp = {
    markers: [],
    loaded: false
}

const IncidentsSlice = createSlice({
    name: 'incidents',
    initialState,

    reducers: {
        loadIncidents: (state, actions: PayloadAction<MarkerType[]>) => {
            state.markers = actions.payload
            state.loaded = true
        },

        addIncident: (state, action: PayloadAction<MarkerType>) => {
            state.markers?.push(action.payload)
        }
    }
})

export const { loadIncidents } = IncidentsSlice.actions
export default IncidentsSlice.reducer