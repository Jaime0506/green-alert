import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./location/locationSlice";
import IncidentsSlice from "./Incidents/IncidentsSlice";


// Esta es la manera en que creo mi store, que es el que va a contener mi estado global
// Explicacion https://www.youtube.com/watch?v=fMiFnbufAP4&pp=ygUgcmVhY3QgcmVkdXggdG9vbGtpdCBlbiA1IG1pbnV0b3M%3D

export const store = configureStore({
    reducer: {
        location: locationSlice,
        indicents: IncidentsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch