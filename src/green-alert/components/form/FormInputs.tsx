import { useEffect, useState } from "react"
import { Input, Select, SelectItem } from "@nextui-org/react"

import { useAppDispatch, useAppSelector } from "../../../hooks"
import { uploadImages } from "../../../store/incidents"

import { InputImages, ListImages } from "./"

import type { FormIncident, IncidentType } from "../../../types"

interface FormInputsProps {
    onChangeInputs: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    formState: FormIncident
    listOfTypeIncidents: IncidentType[]
}

export const FormInputs = ({ onChangeInputs, formState, listOfTypeIncidents }: FormInputsProps) => {

    const { active } = useAppSelector(state => state.incidents)
    const dispatch = useAppDispatch()

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const [isVisible, setIsVisible] = useState(true)

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files && files.length > 3) {
            console.log("No puede agregar mas imagenes chamo")
            e.preventDefault()

            return
        }
        setSelectedFiles(files)
    }

    const handleUploadImages = async () => {
        if (selectedFiles && selectedFiles?.length > 0) dispatch(uploadImages(selectedFiles))
    }

    useEffect(() => {
        handleUploadImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles])

    useEffect(() => {
        if (active.images.length >= 3) setIsVisible(false)
    }, [active.images])

    return (
        <section className="flex flex-col flex-1 gap-4">
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

                <InputImages 
                    isVisible={isVisible}
                    onChangeFile={handleChangeFile}
                />
            </div>

            <ListImages images={active.images} />
        </section>
    )
}

