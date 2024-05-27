import { useEffect, useState } from "react"
import { MarkerType } from "../../types"
import { MarkersTable } from "../components"
import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, useDisclosure, Switch } from "@nextui-org/react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Loading } from "../../components"
import { supabase } from "../../utils/supabase"
import { toast } from "react-toastify"
import { deleteIncident, updateIncident } from "../../store/incidents"


interface DashboardPageProps {
    markers: MarkerType[]
}

export const DashboardPage = ({ markers }: DashboardPageProps) => {
    const [markerActiveModal, setMarkerActiveModal] = useState<MarkerType | null>(null)
    const [formValues, setFormValues] = useState<MarkerType | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    const listIncidentsType = useAppSelector(state => state.incidents.listIncidentsType)
    const dispatch = useAppDispatch()

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    const openModal = (marker: MarkerType) => {
        setMarkerActiveModal(marker)
        onOpen()
    }

    const deleteImage = (path: string) => {
        const tempFormValues = formValues

        if (!tempFormValues) return

        tempFormValues.images = tempFormValues.images.filter(path_image => path_image != path)

        setFormValues({
            ...tempFormValues,
            images: tempFormValues.images
        })
    }

    const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

        if (!formValues) return

        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onChangeSwitch = (isSelected: boolean) => {
        if (!formValues) return

        setFormValues({
            ...formValues,
            active: isSelected
        })
    }

    const saveChanges = async () => {
        setIsLoading(true)

        const dataUpdate = { ...formValues }

        const { error } = await supabase
            .from("incidents_duplicate")
            .update(dataUpdate)
            .eq("id", dataUpdate.id)

        if (error) {
            toast.error("Error al tratar de actualizar los datos", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

            setIsLoading(false)
            return
        }

        toast.success("Datos actualizados correctamente", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })

        dispatch(updateIncident(formValues as MarkerType))
        setIsLoading(false)
        onClose()
    }

    const onDeleteIncident = async (id: string) => {
        console.log("Me llamaron")

        const { error } = await supabase
            .from("incidents_duplicate")
            .delete()
            .eq("id", id)

        if (error) {
            toast.error("No se pudo eliminar el registro", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

            return
        }

        dispatch(deleteIncident(id))

        toast.success("Registro eliminado con exito", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })

    }

    useEffect(() => {
        if (markerActiveModal) {
            setFormValues({
                ...markerActiveModal,
                name: markerActiveModal.name,
                images: markerActiveModal.images,
                incident_type: markerActiveModal.incident_type,
                active: markerActiveModal.active
            })
        } else {
            setFormValues(null)
        }
    }, [markerActiveModal])

    useEffect(() => {
        if (!markerActiveModal) return

        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [markerActiveModal])

    if (!listIncidentsType) return null

    return (
        <main className="h-screen w-screen flex items-center justify-center">
            <MarkersTable markers={markers} openModal={openModal} onDelete={onDeleteIncident} />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" className="max-h-[600px] max-w-[600px] overflow-hidden" >
                <ModalContent>
                    {isLoading ? <Loading /> : (
                        <>
                            <ModalHeader className="flex p-0">

                                <div className=" w-full h-[50px] bg-no-repeat bg-cover bg-center flex py-4 px-5" >
                                    Editar incidente
                                </div>

                            </ModalHeader>
                            <ModalBody className="pb-6">
                                <section className="flex gap-4 flex-col pt-2">
                                    <article>
                                        Creado por:
                                        <Input
                                            className="text-green-700 pt-2"
                                            value={formValues?.name}
                                            onChange={onChangeInputs}
                                            name="name"
                                        />
                                    </article>

                                    <article className="">
                                        Incidente de tipo:
                                        <Select
                                            isRequired
                                            labelPlacement="outside"
                                            placeholder="Seleccionar"
                                            className="pt-2"
                                            style={{ width: "320px" }}
                                            value={formValues?.incident_type}
                                            name="incident_type"
                                            onChange={onChangeInputs}
                                            aria-label="Seleccionar incidente"
                                        >
                                            {listIncidentsType.map((incidente) => {
                                                return (
                                                    <SelectItem key={incidente.id} value={incidente.id}>
                                                        {incidente.name}
                                                    </SelectItem>
                                                )
                                            })}
                                        </Select>
                                    </article>

                                    <article>
                                        <Switch
                                            color="success"
                                            isSelected={formValues?.active}
                                            onValueChange={onChangeSwitch}
                                        >
                                            Incidente {formValues?.active ? "Activo" : "Incativo"}
                                        </Switch>
                                    </article>

                                    {
                                        formValues?.images && (
                                            <section className="flex flex-col gap-4">
                                                <h3 className="text-green-700">Imagenes del incidente</h3>
                                                {
                                                    formValues?.images.map((path, index) => {
                                                        return (
                                                            <Image
                                                                key={index}
                                                                src={`https://ohcjcommgokajjptkmhd.supabase.co/storage/v1/object/public/test/${path}`}
                                                                alt="image"
                                                                className="w-full"
                                                                onClick={() => deleteImage(path)}
                                                            />
                                                        )
                                                    })
                                                }
                                            </section>
                                        )
                                    }

                                    <section>
                                        <Button color="success" onClick={saveChanges} >Save</Button>
                                    </section>
                                </section>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    )
}
