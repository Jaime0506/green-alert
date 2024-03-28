import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MarkerType  } from "../../types";

interface initialStateProp {
    markers: MarkerType[] | undefined
    loaded: boolean
    active: MarkerType | undefined
}

const initialState: initialStateProp = {
    markers: [],
    loaded: false,
    active: undefined
}

const IncidentsSlice = createSlice({
    name: 'incidents',
    initialState,

    reducers: {
        loadIncidents: (state, actions: PayloadAction<MarkerType[]>) => {
            state.markers = actions.payload
            state.loaded = true
        },

        setActive: (state, action: PayloadAction<MarkerType>) => {
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
        }
    }
})

export const { loadIncidents, addIncident, setActive, updateIncident } = IncidentsSlice.actions
export default IncidentsSlice.reducer