import { useAppSelector } from "../../../hooks/useStore";

import { Button } from "@nextui-org/react";

import { FormInputs } from "./FormInputs";
import { useFormValues } from "../../../hooks/useFormValues";

import type { FormIncident } from "../../../types";
import { useFormIncidents } from "../../../hooks";

interface FormProps {
    toggleDrawer: () => void;
    editing: boolean;
}

const initialStateForm: FormIncident = {
    name: "",
    incident_type: 0,
}

export function Form({ editing, toggleDrawer }: FormProps) {

    const { listIncidentsType, isLoading } = useAppSelector((state) => state.indicents);

    const { formState, onChangeInputs } = useFormValues<FormIncident>({ initialStateForm })
    const { onSubmit } = useFormIncidents({ editing, initialState: formState, toggleDrawer})

    if (!listIncidentsType) return null

    return (
        <form action="submit" onSubmit={onSubmit}>
            <div className="flex flex-col p-4 px-8 gap-6">
                <h1 className="px-6 text-[3.5rem] mb-[15px]" >
                    GreenAlert
                </h1>
                
                <FormInputs 
                    formState={formState}
                    onChangeInputs={onChangeInputs} 
                    listOfTypeIncidents={listIncidentsType}
                />

                <Button // Funcion anonima -> evita que se dispare la accion cuando se carga el comp
                    className="mt-12 text-white"
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