
import { updateDataToDatabase, uploadDataToDatabase } from "../store/incidents"
import { MarkerType } from "../types"
import { useAppDispatch, useAppSelector } from "./useStore"

interface useFormProps<T> {
    editing: boolean
    toggleDrawer: () => void
    initialState: T
}

export const useFormIncidents = <T,>({ editing, toggleDrawer, initialState }: useFormProps<T>) => {

    const active = useAppSelector(state => state.incidents.active)
    const { uid } = useAppSelector(state =>  state.auth)
    const dispatch = useAppDispatch()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(initialState)
        
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

        if (!uid) return 
        
        newData.name = formState.name
        newData.active = true
        newData.incident_type = formState.incident_type
        newData.create_by = uid

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
        onSubmit
    // }
     } 
}
