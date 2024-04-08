import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";

import {
  updateDataToDatabase,
  uploadDataToDatabase,
} from "../../../store/Incidents/thunks";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormProps {
  toggleDrawer: () => void;
  editing: boolean;
}

export function Form({ toggleDrawer, editing }: FormProps) {
  const incidentes = [
    { value: 1, label: "Incedio" },
    { value: 2, label: "Deslizamiento" },
    { value: 3, label: "Lluvias fuertes" },
  ];

  // variables que guardan la seleccion del nombre de usuario y el tipo de incidente
  const [nameForm, setNameForm] = useState("");
  const [incidentType, setIncidentType] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { active, isLoading } = useAppSelector((state) => state.indicents);
  const dispath = useAppDispatch();

  // TODO: Falta guardar los datos que se ingresen en los inputs, en un estado local
  // para despues enviarlo a la base de datos

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    console.log(editing);

    if (!active) {
      return;
    }

    if (!editing) {
      const newData = { ...active };

      newData.name = nameForm;
      newData.active = true;
      newData.incident_type = incidentType;

      toast.success("Incidente registrado", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      dispath(uploadDataToDatabase(newData));
      toggleDrawer();
    }

    const newData = { ...active };

    newData.incident_type = incidentType;

    if (newData.incident_type != active.incident_type) {
      dispath(updateDataToDatabase(newData));
      console.log(editing, "editing");

      if(editing) {
        console.log("editing  si");
        toast.success("Incidente modificado", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    toggleDrawer();
    console.log(newData);
  };

  return (
    <form action="submit" onSubmit={handleOnSubmit}>
      <ToastContainer />
      <div className="flex flex-col p-4 px-8 gap-6">
        <h1
          style={{ fontSize: "3.5rem", marginBottom: "15px" }}
          className="px-6"
        >
          GreenAlert
        </h1>

        {!editing && (
          <div className="flex flex-col gap-2 items-start mb-1">
            <h1 style={{ color: "#17C964", textAlign: "left" }}>Nombre</h1>
            <Input
              type="text"
              placeholder="Nombre de usuario"
              labelPlacement="outside"
              style={{ textAlign: "left", width: "300px" }}
              // Guarda el nombre en el estado cada vez que cambia
              onChange={(e) => setNameForm(e.target.value)}
              aria-label="Nombre de usuario"
              value={nameForm}
              errorMessage={error && error}
              isInvalid={!!error}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 style={{ color: "#17C964", textAlign: "left" }}>
            Tipo de Incidente
          </h1>

          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Select
              isRequired
              labelPlacement="outside"
              placeholder="Seleccionar"
              className="max-w-xs"
              style={{ width: "320px" }}
              value={incidentType}
              // Establece el tipo de incidente segun si key definida en el array de objetos de incidentes
              onChange={(e) => {
                setIncidentType(parseInt(e.target.value));
              }}
              aria-label="Seleccionar incidente"
            >
              {incidentes.map((incidente) => (
                <SelectItem key={incidente.value} value={incidente.value}>
                  {incidente.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

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
