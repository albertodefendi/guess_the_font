import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"
import { useUltraInstinct } from "./SettingsContext";
import { Switch } from "@nextui-org/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function SettingsPage() {
    const { ultraInstinct, setUltraInstinct } = useUltraInstinct();

    const handleDebugToggle = (event) => {
        setUltraInstinct(event.target.checked);
    };

    return (
        <div className="min-h-screen bg-main flex flex-col items-center justify-center text-white">
            <div className="grid gap-8 p-8 text-lg lg:text-2xl rounded-xl bg-custom-black-1">
                <Link
                    to="/"
                    className="w-fit"
                >
                    <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                </Link>
                <Switch
                    isSelected={ultraInstinct}
                    onChange={handleDebugToggle}
                    classNames={{
                        base: "inline-flex flex-row-reverse gap-4",
                        wrapper: "bg-zinc-500 group-data-[selected=true]:bg-custom-green",
                        label: "text-inherit text-[length:inherit] ms-0",
                    }}>
                    <div>
                        Enable Ultra Instinct
                    </div>
                    <div className="text-red-400 text-xs lg:text-sm">Attention: enabling Ultra Instinct will reset your current streak!</div>
                </Switch>
                <div>
                    <div>Use a custom text</div>
                    <TextChangeModal></TextChangeModal>
                </div>
            </div>
        </div>
    );
}



function TextChangeModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                    nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                    deserunt nostrud ad veniam.
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
        </>
    )
}




// TODO: aggiungere una sezione per mettere un testo custom per l'identificazione del font
// TODO: aggiungere la possibilità di modificare i colori del tema