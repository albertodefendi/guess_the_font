import React, { useState, useEffect } from "react";
import MyButton from "./MyButton";
import { Link } from "react-router-dom";
import { ArrowLeftToLine } from "lucide-react"
import { useUltraInstinct } from "./SettingsContext";
import {
    Divider,
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

    const handleDebugToggle = () => {
        setUltraInstinct((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen bg-main p-4 flex flex-col items-center justify-center text-white">
            <div className="xl:w-1/2 max-w-3xl flex flex-col gap-12 p-8 text-base lg:text-xl rounded-xl bg-custom-black border-4 border-zinc-700">
                <div className="flex justify-between items-center">
                    <div className="basis-1/3">
                        <Link to="/" className="w-min flex">
                            <ArrowLeftToLine size={28} className="hover:text-custom-green duration-100" />
                        </Link>
                    </div>
                    <div className="basis-1/3 text-xl lg:text-2xl text-center">Settings</div>
                    <div className="basis-1/3"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

                    {/* FIrst row */}
                    <div className="flex items-center lg:col-span-3">
                        <div>
                            <div>Enable Ultra Instinct</div>
                            <div className="text-red-400 text-xs lg:text-sm">Attention: enabling Ultra Instinct will reset your current streak and prevent you from scoring any point!</div>
                        </div>
                    </div>
                    <MyButton className={`text-base lg:text-lg${ultraInstinct ? " text-override-black bg-custom-green" : ""}`} onClickFunction={handleDebugToggle}>
                        {!ultraInstinct ? "Enable" : "Disable"}
                    </MyButton>

                    <Divider className="lg:col-span-4 bg-custom-black-2" orientation="horizontal" />

                    {/* Second row */}
                    <div className="flex items-center lg:col-span-3">Use a custom text</div>
                    <TextChangeModal></TextChangeModal>
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
            <MyButton className="text-base lg:text-lg" onClickFunction={onOpen}>Change</MyButton>
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