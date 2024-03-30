import { Input, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { updateIncident } from "../../../store/Incidents";
import { uploadDataToDatabase } from "../../../store/Incidents/thunks";
import { useState } from "react";

export function Form() {
  const incidentes = [
    { value: 1, label: "Incedio" },
    { value: 2, label: "Deslizamiento" },
    { value: 3, label: "Lluvias fuertes" },
  ];

  // variables que guardan la seleccion del nombre de usuario y el tipo de incidente
  const [nameForm, setNameForm] = useState("");
  const [incidentType, setIncidentType] = useState(0);

  const { active } = useAppSelector((state) => state.indicents);
  const dispath = useAppDispatch();

  // TODO: Falta guardar los datos que se ingresen en los inputs, en un estado local
  // para despues enviarlo a la base de datos

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!active) {
      return;
    }

    const newData = { ...active };

    newData.name = nameForm;
    newData.active = true;
    newData.incident_type = incidentType;

    dispath(updateIncident(newData));
    dispath(uploadDataToDatabase(newData));
    console.log("Hola")
  };

  return (
    <form action="submit" onSubmit={handleOnSubmit}>
      <div className="flex flex-col p-4 px-8 gap-6">
        <h1
          style={{ fontSize: "3.5rem", marginBottom: "15px" }}
          className="px-6"
        >
          GreenAlert
        </h1>

        <div className="flex flex-col gap-2 items-start mb-1">
          <h1 style={{ color: "#17C964", textAlign: "left" }}>Nombre</h1>
          <Input
            required
            type="text"
            placeholder="Nombre de usuario"
            labelPlacement="outside"
            style={{ textAlign: "left", width: "300px" }}
            // Guarda el nombre en el estado cada vez que cambia
            onChange={(e) => setNameForm(e.target.value)}
            aria-label="Nombre de quien registra"
            errorMessage="Se requieren todos los campos"
            isInvalid
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 style={{ color: "#17C964", textAlign: "left" }}>
            Tipo de Incidente
          </h1>

          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Select
              required
              labelPlacement="outside"
              placeholder="Seleccionar"
              className="max-w-xs"
              style={{ width: "320px" }}
              // Establece el tipo de incidente segun si key definida en el array de objetos de incidentes
              onChange={(e) => {
                setIncidentType(parseInt(e.target.value));
              }}
              aria-label="Seleccionar incendio"
            >
              {incidentes.map((incidente) => (
                <SelectItem key={incidente.value} value={incidente.value}>
                  {incidente.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start">
            <h1 className="pb-1" style={{ color: "#17C964" }}>
              Radio
            </h1>
            <Checkbox color="success">Metros</Checkbox>
          </div>
        </div>

        <Button // Funcion anonima -> evita que se dispare la accion cuando se carga el comp
          className="mt-5"
          style={{ fontFamily: "Arial" }}
          variant="shadow"
          color="success"
          type="submit"
        >
          Registrar
        </Button>
      </div>
    </form>
  );
}
