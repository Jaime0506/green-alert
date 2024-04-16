import { useState } from "react"

interface useFormProps<T> {
    initialStateForm: T
}

export const useForm = <T>({ initialStateForm }: useFormProps<T> ) => {
    const [initialState, setInitialState] = useState<T>(initialStateForm)

    const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setInitialState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const validateForm = () => {
        console.log(initialState)
        return true
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Si pasa el validate form se envia la monda")

        validateForm()
    }


    return {
        // Values
        formState: initialState,

        // Methods
        onChangeInputs,
        onSubmit
    }
}
