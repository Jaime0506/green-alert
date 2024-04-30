import { useAppSelector } from "../../../hooks/useStore";

import { Button } from "@nextui-org/react";

import { FormInputs } from "./FormInputs";
import { useFormValues } from "../../../hooks/useFormValues";
import { useFormIncidents } from "../../../hooks";

import type { FormIncident } from "../../../types";

interface FormProps {
    toggleDrawer: () => void;
    editing: boolean;
}

const initialStateForm: FormIncident = {
    name: "",
    incident_type: 0,
}

export function Form({ editing, toggleDrawer }: FormProps) {

    const { listIncidentsType, isLoading } = useAppSelector((state) => state.incidents);

    const { formState, onChangeInputs } = useFormValues<FormIncident>({ initialStateForm })
    const { onSubmit } = useFormIncidents({ editing, initialState: formState, toggleDrawer})

    if (!listIncidentsType) return null

    return (
        <form action="submit" onSubmit={onSubmit} className="border border-purple-500">
            <div className="flex flex-col p-4 px-8 gap-3" style={{ maxHeight: "100vh",  }}>
                <h1 className="px-6 text-[3.5rem]" >
                    GreenAlert
                </h1>
                
                <FormInputs 
                    formState={formState}
                    onChangeInputs={onChangeInputs} 
                    listOfTypeIncidents={listIncidentsType}
                />

                <Button 
                    className="text-white"
                    style={{ fontFamily: "Arial" }}
                    variant="shadow"
                    color="success"
                    type="submit"
                    isLoading={isLoading}
                >
                    {editing ? "Guardar" : "Registrar"}
                </Button>
            </div>
        </form>
    );
}