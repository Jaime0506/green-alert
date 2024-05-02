import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure, Image } from "@nextui-org/react";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import { Map, DrawerWrapper, Form } from "../components";
import { fetchDataIncidentTypes, fetchDataIncidents } from "../../store/incidents";
import { Loading } from "../../components";

import type { MarkerType } from "../../types";
import { handleIncidentFormatDate, handleIncidentImage, handleIncidentText } from "../../utils";

const API_KEY = import.meta.env.VITE_API_KEY;

export const MapPage = () => {

    const { coords } = useAppSelector((state) => state.location);
    const dispatch = useAppDispatch();

    // Modal controller
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [markerActiveModal, setMarkerActiveModal] = useState<MarkerType | null>(null)

    const { lat, lng } = coords;

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [editing, setEditing] = useState(false)

    const toggleDrawer = (type?: "edit") => {
        if (type == "edit") {
            setEditing(true)
        } else {
            setEditing(false)
        }

        setIsOpenDrawer((value) => !value);
    };

    const openModal = (marker: MarkerType) => {
        setMarkerActiveModal(marker)
        onOpen()
    }

    useEffect(() => {
        dispatch(fetchDataIncidents());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        dispatch(fetchDataIncidentTypes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(markerActiveModal)
    }, [markerActiveModal])


    if (lat === null && lng === null) return <Loading />;

    return (
        <div className="border-t border-green-500 flex p-2">

            <Map
                API_KEY={API_KEY}
                toggleDrawer={toggleDrawer}
                isOpenDrawer={isOpenDrawer}
                editing={editing}
                onClick={openModal}
            />

            <DrawerWrapper isOpenDrawer={isOpenDrawer}>
                <Form toggleDrawer={toggleDrawer} editing={editing} />
            </DrawerWrapper>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" className="max-h-[400px] overflow-hidden" >
                <ModalContent>
                    <>
                        <ModalHeader className="flex p-0">

                            <div
                                className=" w-full h-[50px] bg-no-repeat bg-cover bg-center flex py-4 px-5"
                                style={{ backgroundImage: `url(${handleIncidentImage(markerActiveModal?.incident_type as number)})`, width: '100vh', height: '100px' }}
                            >
                                <h1 className="text-white">{handleIncidentText(markerActiveModal?.incident_type as number)}</h1>
                            </div>

                        </ModalHeader>
                        <ModalBody className="pb-6">
                            <section className="flex gap-4 flex-col pt-2">
                                <article>
                                    <h3 className="text-green-700">
                                        El incidente fue reportado el:
                                    </h3>
                                    <p>
                                        {handleIncidentFormatDate(markerActiveModal?.created_at as Date)}
                                    </p>
                                </article>
                                <article>
                                    <h3 className=" text-green-700">
                                        Por el usuario:
                                    </h3>
                                    <p>{markerActiveModal?.name}</p>
                                </article>

                                {
                                    markerActiveModal?.images && (
                                        <section className="flex flex-col gap-4">
                                            <h3 className="text-green-700">Imagenes del incidente</h3>
                                            {
                                                markerActiveModal?.images.map((path, index) => {
                                                    return (
                                                        <Image
                                                            key={index}
                                                            src={`https://ohcjcommgokajjptkmhd.supabase.co/storage/v1/object/public/test/${path}`}
                                                            alt="image"
                                                            className="w-full"
                                                        />
                                                    )
                                                })
                                            }
                                        </section>
                                    )
                                }
                                <article>
                                    <p>
                                        Las autoridades correspondientes ya fueron alertadas para acudir al lugar de los hechos lo mas pronto posible
                                    </p>
                                </article>
                                <article>
                                    <h3 className="inline-block text-green-700">Estado: </h3>
                                    <p className="inline-block ml-2">
                                        {markerActiveModal?.active ? 'Activo' : 'Inactivo'}
                                    </p>
                                </article>
                            </section>
                        </ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </div >
    );
};
