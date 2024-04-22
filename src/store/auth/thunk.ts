import { supabase } from "../../utils/supabase"

import type { FormRegister } from "../../types"

export const onRegisterUser = (formState: FormRegister) => {
    return async () => {
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

        console.log(data)
    }
}