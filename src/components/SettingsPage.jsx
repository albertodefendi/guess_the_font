import React, { useState, useEffect } from "react";
import MyButton from "./MyButton";
import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"
import { useUltraInstinct } from "./SettingsContext";
import {
    Switch,
    Textarea,
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
        <div className="min-h-screen bg-main p-4 flex flex-col items-center justify-center text-white">
            <div className="flex flex-col gap-14 p-8 text-lg lg:text-xl rounded-xl bg-custom-black border-4 border-zinc-700">
                <div className="flex justify-between">
                    <Link
                        to="/"
                        className="w-fit flex-1"
                    >
                        <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                    </Link>
                    <div className="text-xl lg:text-2xl">Settings</div>
                    <div className="flex-1"></div>
                </div>
                <div className="grid gap-8">
                    <Switch
                        isSelected={ultraInstinct}
                        onChange={handleDebugToggle}
                        classNames={{
                            base: "inline-flex flex-row-reverse justify-between",
                            wrapper: "bg-zinc-500 group-data-[selected=true]:bg-custom-green",
                            label: "text-inherit text-[length:inherit] ms-0",
                        }}>
                        <div className="me-8">
                            <div>Enable Ultra Instinct</div>
                            <div className="text-red-400 text-xs lg:text-sm">Attention: enabling Ultra Instinct will reset your current streak!</div>
                        </div>
                    </Switch>
                    <div className="flex justify-between">
                        <div className="flex items-center">Use a custom text</div>
                        <TextChangeModal></TextChangeModal>
                    </div>
                </div>
            </div>
        </div>
    );
}



function TextChangeModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [textArea, setTextArea] = useState("");
    const maxChars = 140;

    // Inizializza la Textarea con il valore nel localStorage quando il Modal si apre
    useEffect(() => {
        if (isOpen) {
            const savedText = localStorage.getItem("customText") || ""; // Ottieni il valore dal localStorage
            setTextArea(savedText);
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        if (e.target.value.length <= maxChars) {
            setTextArea(e.target.value);
        }
    };

    const handleReset = () => {
        setTextArea(""); // Resetta il contenuto della Textarea
    };

    const handleSave = (onClose) => {
        localStorage.setItem("customText", textArea); // Salva il testo nel localStorage
        onClose(); // Chiude il Modal
    };

    return (
        <>
            <MyButton className="text-lg" onClickFunction={onOpen}>Change</MyButton>
            <Modal isOpen={isOpen} size={"xl"} onOpenChange={onOpenChange} placement="center" className="m-4">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Insert your custom text to recognize the font</ModalHeader>
                            <ModalBody>
                                <Textarea
                                    placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo esse accusamus quasi magni totam? Nesciunt, harum!"
                                    value={textArea}
                                    onChange={handleInputChange} // Limita l'input ai 140 caratteri
                                />
                                <div className="text-right text-sm text-gray-500 mt-2">
                                    {maxChars - textArea.length} characters remaining
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" radius="sm" variant="light" onPress={handleReset}>
                                    Reset
                                </Button>
                                <Button
                                    className="bg-custom-green"
                                    radius="sm"
                                    onPress={() => handleSave(onClose)} // Salva e chiude il Modal
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}




// TODO: aggiungere la possibilità di modificare i colori del tema