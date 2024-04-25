import { Input, Select, SelectItem } from "@nextui-org/react"
import type { FormIncident, IncidentType } from "../../../types"
import { useAppSelector } from "../../../hooks"
import React, { useState } from "react"

interface FormInputsProps {
    onChangeInputs: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    formState: FormIncident
    listOfTypeIncidents: IncidentType[]
}

export const FormInputs = ({ onChangeInputs, formState, listOfTypeIncidents }: FormInputsProps) => {

    const { uid } = useAppSelector(state => state.auth)
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files && files.length > 3) {
            console.log("No puede agregar mas imagenes chamo")
            e.preventDefault()

            return
        }
        
        console.log(files, uid)
        setSelectedFiles(files)
    }

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

            <div className="flex flex-col gap-2 text-left">
                <h1 style={{ color: "#17C964" }}>
                    Imagenes del incidente
                </h1>

                <div className="flex w-full flex-col flex-wrap items md:flex-nowrap mb-6 md:mb-0 gap-4 text-left">
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleChangeFile} 
                        multiple
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" 
                    />

                    {
                        selectedFiles && Array.from(selectedFiles).map((file, index) => (
                        <li key={index} >
                            {index}{file.name}
                        </li>
                    ))}

                </div>
            </div>
        </>
    )
}

