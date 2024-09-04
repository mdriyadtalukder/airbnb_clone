"use client";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    secondaryActionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
};

const Modal : React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    secondaryActionLabel,
    disabled,
    secondaryAction,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            if (onClose) onClose();  // Check if onClose is defined
        }, 300);
    };

    const handleSubmit = () => {
        if (disabled) return;
        if (onSubmit) onSubmit();  // Check if onSubmit is defined
    };

    const handleSecondaryAction = () => {
        if (disabled || !secondaryAction) return;
        secondaryAction();
    };

    if (!isOpen) return null;

    return (
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className="w-full relative md:w-4/6 lg:w-3/6 xl:w-2/5 my-6">
                <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                    <div className="h-full translate lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                            <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                                <CgClose />
                            </button>
                            <div className="text-lg font-semibold">
                                {title}
                            </div>
                        </div>
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                        <div className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryAction && secondaryActionLabel && (
                                    <Button
                                        disabled={disabled}
                                        outline
                                        label={secondaryActionLabel}
                                        onClick={handleSecondaryAction}
                                    />
                                )}
                                <Button
                                    disabled={disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
