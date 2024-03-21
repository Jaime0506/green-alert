import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./location/locationSlice";

export const store = configureStore({
    reducer: {
        location: locationSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch