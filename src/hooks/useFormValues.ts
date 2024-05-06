import { useEffect, useState } from "react"
import { useAppSelector } from "./useStore"

interface useFormProps<T> {
    initialStateForm: T
}

export const useFormValues = <T>({ initialStateForm }: useFormProps<T>) => {

    const { user } = useAppSelector(state => state.auth)
    const [initialState, setInitialState] = useState<T>(initialStateForm)

    useEffect(() => {
        if (user?.name && user.name.length > 0) {
            setInitialState((prevState) => {
                return {
                   ...prevState,
                    name: user.name
                }
            })
        }
    }, [user])
    

    const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setInitialState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return {
        // Values
        formState: initialState,

        // Methods
        onChangeInputs
    }
}
