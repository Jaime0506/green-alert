import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AuthType } from '../../types';

const initialState: AuthType = {
    status: "not-authenticated",
    uid: null,
    user: {
        email: undefined,
        name: undefined
    },
    errorMessage: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        checking: (state) => {
            state.status = "checking"
        },

        login: (state, action: PayloadAction<AuthType>) => {
            state.status = action.payload.status
            state.uid = action.payload.uid
            state.user = action.payload.user
            state.errorMessage = action.payload.errorMessage
        },

        logout: (state) => {
            state.status = "not-authenticated"
            state.uid = null
            state.user = undefined
            state.errorMessage = null
        },
        errorLogout: (state) => {
            state.status = "authenticated"
        }
    },
});

export const { login, logout, checking } = authSlice.actions;

export default authSlice.reducer