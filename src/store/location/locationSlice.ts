import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface Location {
  coords: {
    lat: number | null;
    lng: number | null;
  };
}

interface Coords {
  lat: number;
  lng: number;
}

const initialState: Location = {
  coords: {
    lat: null,
    lng: null,
  },
};

const locationSlice = createSlice({
  name: "location",
  initialState,

  reducers: {
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
    deleteCoords: (state, action: PayloadAction<Coords>) => {
      state.coords.lat = action.payload.lat
      state.coords.lng = action.payload.lng
      console.log(action);
    },
  },
});

export const { setCoords, deleteCoords } = locationSlice.actions;
export default locationSlice.reducer;
