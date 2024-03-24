import { createSlice } from "@reduxjs/toolkit";
interface Location {
    coords: {
        lat: number | null
        lng: number | null
    }
}

const initialState: Location  = {
    coords: {
        lat: null,
        lng: null
    }
}

const locationSlice = createSlice({
    name: 'location',
    initialState,

    reducers: {
        setCoords: (state, action) => {
            state.coords = action.payload
        }
    }
})

export const { setCoords } = locationSlice.actions
export default locationSlice.reducer