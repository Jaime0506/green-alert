import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { AuthType } from '../../types';

const initialState: AuthType = {
    status: "not-authenticated",
    uid: null,
    user: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, actions: PayloadAction<object>) => {
            state.user = actions.payload
        }
    },
});

export const { login } = authSlice.actions;

export default authSlice.reducer