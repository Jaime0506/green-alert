import { supabase } from "../../utils/supabase"

import { AppDispatch } from "../store"
import { checking, login, logout } from "./authSlice"
import type { AuthType, FormLogin, FormRegister } from "../../types"

export const onRegisterUser = (formState: FormRegister) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking())

        const { data, error } = await supabase.auth.signUp({
            email: formState.email,
            password: formState.password,
            options: {
                data: {
                    name: formState.name,
                }
            }
        })

        if (error) return console.log(error)

        const { user } = data

        if (!user) return console.log("Algo no salio bien")

        const { id, email, user_metadata } = user
        const { name } = user_metadata

        const userData: AuthType = {
            status: "authenticated",
            uid: id,
            user: {
                email,
                name,
            },
            errorMessage: null
        }

        dispatch(login(userData))
    }
}

export const onLoginUser = (formState: FormLogin) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking())

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formState.email,
            password: formState.password,
        })

        if (error) return console.log(error)

        const { user } = data

        if (!user) return console.log("Chamo algo paso")

        const { id, email, user_metadata } = user
        const { name } = user_metadata

        const userData: AuthType = {
            status: "authenticated",
            uid: id,
            user: {
                email,
                name,
            },
            errorMessage: null
        }

        dispatch(login(userData))
    }
}

export const onGetUser = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking())

        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) return console.log(error)

        if (!session?.user) return dispatch(logout())
            
        const { id, email, user_metadata } = session.user
        const { name } = user_metadata

        const userData: AuthType = {
            status: "authenticated",
            uid: id,
            user: {
                email,
                name,
            },
            errorMessage: null
        }

        dispatch(login(userData))        
    }
}

export const onLogoutUser = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checking())

        const { error } =  await supabase.auth.signOut()

        if (error) return console.log("No pudimos cerrar sesion")

        dispatch(logout())
    }
}