import { useState } from "react"

import { useAppDispatch, useAppSelector } from "./useStore"
import { updateDataToDatabase, uploadDataToDatabase } from "../store/Incidents"

import type { MarkerType } from '../types'

interface useFormProps<T> {
    initialStateForm: T
    editing: boolean
    toggleDrawer: () => void
}

export const useForm = <T>({ initialStateForm, editing, toggleDrawer }: useFormProps<T>) => {

    const active = useAppSelector(state => state.indicents.active)
    const dispatch = useAppDispatch()

    const [initialState, setInitialState] = useState<T>(initialStateForm)

    const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setInitialState((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (editing) {
            updateIncident(initialState as MarkerType)
        } else {
            uploadIncident(initialState as MarkerType)
        }

        toggleDrawer()
    }

    const uploadIncident = (formState: MarkerType) => {
        if (active == undefined) return

        const newData = { ...active }
        
        newData.name = formState.name
        newData.active = true
        newData.incident_type = formState.incident_type

        dispatch(uploadDataToDatabase(newData))
    }

    const updateIncident = (initialState: MarkerType) => {
        if (active == undefined) return

        const newData = { ...active }
        const hasChangedFormState = newData.incident_type != initialState.incident_type

        newData.incident_type = initialState.incident_type

        if (hasChangedFormState) {
            dispatch(updateDataToDatabase(newData))
        }
    }

    return {
        // Values
        formState: initialState,

        // Methods
        onChangeInputs,
        onSubmit,
    }
}
