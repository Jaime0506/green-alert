import React, { useEffect, useState } from "react"
import { Input, Select, SelectItem } from "@nextui-org/react"
// import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch, useAppSelector } from "../../../hooks"
import { supabase } from "../../../utils/supabase"

import type { FileObject } from '@supabase/storage-js'
import type { FormIncident, IncidentType } from "../../../types"
import { uploadImages } from "../../../store/incidents"

interface FormInputsProps {
    onChangeInputs: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    formState: FormIncident
    listOfTypeIncidents: IncidentType[]
}

export const FormInputs = ({ onChangeInputs, formState, listOfTypeIncidents }: FormInputsProps) => {

    const { uid } = useAppSelector(state => state.auth)
    const { active } = useAppSelector(state => state.incidents)
    const dispatch = useAppDispatch()

    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
    const [media, setMedia] = useState<FileObject[]>([])
    const [visibleInput, setVisibleInput] = useState(true)

    // const [loading, setLoading] = useState(false)

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files && files.length > 3) {
            console.log("No puede agregar mas imagenes chamo")
            e.preventDefault()

            return
        }
        setSelectedFiles(files)
        // setLoading(true)
    }

    const handleUploadImages = async () => {
        if (selectedFiles && selectedFiles?.length > 0) dispatch(uploadImages(selectedFiles))
    }

    const getMedia = async () => {
        const { data, error } = await supabase.storage.from('test').list(uid + "/" + active?.id, {
            limit: 10,
            offset: 0,
            sortBy: {
                column: 'name', order: 'asc'
            }
        })

        if (error) return console.log(error)

        setMedia(data)
    }

    useEffect(() => {
        handleUploadImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFiles])

    useEffect(() => {
        if (media.length >= 3) setVisibleInput(false)
    }, [media])
    

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

                {
                    visibleInput && (
                        <div className="flex w-full flex-col flex-wrap items md:flex-nowrap mb-6 md:mb-0 gap-4 text-left">
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-[110px]">
                                    <div className="flex flex-col items-center justify-center">
                                        <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleChangeFile} />
                                </label>
                            </div>
                        </div>
                    )
                }
            </div>


            {
                media.length > 0 && (
                    <section className="flex flex-row gap-2 py-4">
                        {
                            media.map((media, index) => (
                                <div key={index} className="">
                                    <img src={`https://ohcjcommgokajjptkmhd.supabase.co/storage/v1/object/public/test/${uid}/${active?.id}/${media.name}`} className="w-28" />
                                </div>
                            ))
                        }
                    </section>
                )
            }
        </section>
    )
}

