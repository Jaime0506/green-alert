import { Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { updateIncident } from "../../../store/Incidents";
import { updateDataToDatabase } from "../../../store/Incidents/thunks";
import { useState } from "react";

export function FormUpdate() {
  const incidentes = [
    { value: 1, label: "Incedio" },
    { value: 2, label: "Deslizamiento" },
    { value: 3, label: "Lluvias fuertes" },
  ];

  // variables que guardan la seleccion del nombre de usuario y el tipo de incidente
  const [incidentType, setIncidentType] = useState(0);

  const { active } = useAppSelector((state) => state.indicents);
  const dispath = useAppDispatch();

  // TODO: Falta guardar los datos que se ingresen en los inputs, en un estado local
  // para despues enviarlo a la base de datos

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('hola desde update')
    event.preventDefault();

    if (!active) {
      return;
    }

    const newData = { ...active };
    const id = newData.id

    newData.active = true;
    newData.incident_type = incidentType;

    dispath(updateIncident(newData));
    dispath(updateDataToDatabase(newData, id))
  };

  return (
    <form action="submit" onSubmit={handleOnSubmit}>
      <div className="flex flex-col p-4 px-8 gap-12">
        <h1
          style={{ fontSize: "3.5rem", marginBottom: "30px" }}
          className="px-6"
        >
          GreenAlert
        </h1>

        <div className="flex flex-col gap-2 mb-6">
          <h1 style={{ color: "#17C964", textAlign: "left" }}>
            Tipo de Incidente
          </h1>

          <div className="flex w-full flex-wrap items-end md:flex-nowrap md:mb-0 gap-4">
            <Select
              isRequired
              labelPlacement="outside"
              placeholder="Seleccionar"
              className="max-w-xs"
              style={{ width: "320px" }}
              // Establece el tipo de incidente segun si key definida en el array de objetos de incidentes
              onChange={(e) => {
                setIncidentType(parseInt(e.target.value));
              }}
              aria-selected
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
          className="mt-20"
          style={{ fontFamily: "Arial" }}
          variant="shadow"
          color="success"
          type="submit"
        >
          Modificar
        </Button>
      </div>
    </form>
  );
}