import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import { Map, DrawerWrapper, Form } from "../components";
import { fetchDataIncidentTypes, fetchDataIncidents } from "../../store/incidents";
import { Loading } from "../../components";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

const API_KEY = import.meta.env.VITE_API_KEY;

export const MapPage = () => {

    const { coords } = useAppSelector((state) => state.location);
    const dispatch = useAppDispatch();

    const { isOpen, onOpenChange } = useDisclosure()

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

    useEffect(() => {
        dispatch(fetchDataIncidents());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        dispatch(fetchDataIncidentTypes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (lat === null && lng === null) return <Loading />;

    return (
        <div className="border-t border-green-500 flex p-2">

            <Map
                API_KEY={API_KEY}
                toggleDrawer={toggleDrawer}
                isOpenDrawer={isOpenDrawer}
                editing={editing}
            />

            <DrawerWrapper isOpenDrawer={isOpenDrawer}>
                <Form toggleDrawer={toggleDrawer} editing={editing} />
            </DrawerWrapper>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};
