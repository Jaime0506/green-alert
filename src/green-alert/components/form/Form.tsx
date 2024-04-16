import { Button } from "@nextui-org/react";
// import { toast } from "react-toastify";

import { useAppSelector } from "../../../hooks/useStore";
// import { updateDataToDatabase, uploadDataToDatabase } from "../../../store/Incidents/thunks";

import { useForm } from "../../../hooks/useForm";

import { FormInputs } from "./FormInputs";
import type { FormIncident } from "../../../types";

interface FormProps {
    toggleDrawer: () => void;
    editing: boolean;
}

const initialStateForm: FormIncident = {
    name: "",
    incident_type: 0,
}

export function Form({ editing }: FormProps) {

    const { formState, onChangeInputs, onSubmit } = useForm<FormIncident>({ initialStateForm })
    // const [error, setError] = useState<string | null>(null);

    const { listIncidentsType } = useAppSelector((state) => state.indicents);
    // const dispath = useAppDispatch();

    // const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     setError(null);
    //     console.log(editing);

    //     if (!active) {
    //         return;
    //     }

    //     if (!editing) {
    //         const newData = { ...active };

    //         newData.name = formState.name;
    //         newData.active = true;
    //         newData.incident_type = formState.incident_type;

    //         dispath(uploadDataToDatabase(newData));

    //         toast.success("Incidente registrado", {
    //             position: "top-center",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });

    //         toggleDrawer()

    //         return
    //     }

    //     const newData = { ...active };

    //     newData.incident_type = formState.incident_type;

    //     if (newData.incident_type != active.incident_type) {
    //         dispath(updateDataToDatabase(newData));

    //         toast.success("Incidente modificado", {
    //             position: "top-center",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });

    //         toggleDrawer();
    //     }
    // };
    if (!listIncidentsType) return <></>

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
                // isLoading={isLoading}
                >
                    {editing ? "Guardar" : "Registrar"}
                </Button>
            </div>
        </form>
    );
}
