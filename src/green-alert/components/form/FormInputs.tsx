import { Input, Select, SelectItem } from "@nextui-org/react"
import type { FormIncident, IncidentType } from "../../../types"

interface FormInputsProps {
    onChangeInputs: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    formState: FormIncident
    listOfTypeIncidents: IncidentType[]
}

export const FormInputs = ({ onChangeInputs, formState, listOfTypeIncidents }: FormInputsProps ) => {
    return (
        <>
            <div className="flex flex-col gap-2 items-start mb-1 text-left">
                <h1 style={{ color: "#17C964" }}>Nombre</h1>
                <Input
                    required
                    isRequired
                    type="text"
                    placeholder="Nombre de usuario"
                    labelPlacement="outside"
                    style={{ textAlign: "left", width: "300px" }}
                    name="name"
                    onChange={onChangeInputs}
                    aria-label="Nombre de usuario"
                    value={formState.name}
                />
            </div>

            <div className="flex flex-col gap-2 text-left">
                    <h1 style={{ color: "#17C964" }}>
                        Tipo de Incidente
                    </h1>

                    <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Select
                            isRequired
                            labelPlacement="outside"
                            placeholder="Seleccionar"
                            className="max-w-xs"
                            style={{ width: "320px" }}
                            value={formState.incident_type}
                            name="incident_type"
                            onChange={onChangeInputs}
                            aria-label="Seleccionar incidente"
                        >
                            {listOfTypeIncidents.map((incidente) => (
                                <SelectItem key={incidente.id} value={incidente.id}>
                                    {incidente.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
        </>
    )
}

