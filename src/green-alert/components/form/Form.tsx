import { Input, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { useAppDispatch } from "../../../hooks/useStore";
import { deleteCoords } from "../../../store/location/locationSlice";

export function Form() {

    const dispatch =  useAppDispatch()

    const handleOnClick = () => {
        dispatch(deleteCoords({lat:10, lng:-15}))
    }

    const incidentes = [
        { value: "key1", label: "Incedio" },
        { value: "key2", label: "Deslizamiento" },
        { value: "key3", label: "Lluvias fuertes" },
    ];

    // TODO: Falta guardar los datos que se ingresen en los inputs, en un estado local
    // para despues enviarlo a la base de datos

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault()
    }

    return (
        <form action="submit" onSubmit={handleOnSubmit}>
            <div className="flex flex-col p-4 px-8 gap-6">
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
                        <h1 className="pb-1" style={{ color: "#17C964" }}>Radio</h1>
                        <Checkbox color="success">Metros</Checkbox>
                    </div>
                </div>

                <Button onClick={handleOnClick} // Funcion anonima -> evita que se dispare la accion cuando se carga el comp
                    className="mt-7"
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
