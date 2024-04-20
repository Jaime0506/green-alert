import { updateDataToDatabase, uploadDataToDatabase } from "../store/Incidents"
import { FormIncident, MarkerType } from "../types"
import { useAppDispatch, useAppSelector } from "./useStore"

interface useFormProps {
    editing: boolean
    toggleDrawer: () => void
    initialState: FormIncident
}

export const useForm = ({ editing, toggleDrawer, initialState }: useFormProps) => {

    const active = useAppSelector(state => state.indicents.active)
    const dispatch = useAppDispatch()

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
        onSubmit
    }
}