import { useState } from "react"

interface useFormProps<T> {
    initialStateForm: T
}

export const useFormValues = <T>({ initialStateForm }: useFormProps<T>) => {

    const [initialState, setInitialState] = useState<T>(initialStateForm)

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
