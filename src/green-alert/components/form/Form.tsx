import { Input } from "@nextui-org/react";
import { Select, SelectItem, Checkbox, Button } from "@nextui-org/react";

export function Form() {
  const incidentes = [
    { value: "key1", label: "Incedio" },
    { value: "key2", label: "Deslizamiento" },
    { value: "key3", label: "Lluvias fuertes" },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <h1 style={{ fontSize: "3.5rem", marginBottom: "15px" }}>GreenAlert</h1>

        <div className="flex flex-col gap-2 items-start mb-1">
          <h1 style={{ color: "#17C964", textAlign: "left" }}>Nombre</h1>
          <Input
            type="text"
            placeholder="Nombre de usuario"
            labelPlacement="outside"
            style={{ textAlign: "left", width: "300px" }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 style={{ color: "#17C964", textAlign: "left" }}>
            Tipo de Incidente
          </h1>

          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Select
              labelPlacement="outside"
              placeholder="Seleccionar"
              className="max-w-xs"
              style={{ width: "320px" }}
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
            <h1 style={{ color: "#17C964", textAlign: "left" }}>Radio</h1>
            <Checkbox color="success">Metros</Checkbox>
          </div>
        </div>

        <Button
          className="mt-7"
          style={{ fontFamily: "Arial" }}
          variant="shadow"
          color="success"
        >
          Registrar
        </Button>
      </div>
    </>
  );
}
