import React, { useEffect, useRef } from 'react';
import styles from './ModalPopupComponent.module.scss';

type PopupProps = {
    isOpen: boolean,
    children: React.ReactNode,
    classes?: keyof typeof styles,
};

const ModalPopupComponent = ({ isOpen, children, classes }: PopupProps) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.show();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className={styles[classes]}>
            {children}
        </dialog>
    );
};

export default ModalPopupComponent;
