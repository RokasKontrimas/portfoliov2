import React, {useEffect, useRef, useState} from 'react';
import styles from './ModalComponent.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faClose} from "@fortawesome/free-solid-svg-icons";

type ModalProps = {
    isOpen: () => void,
    onClose: () => void,
    children: React.ReactNode
}
const ModalComponent: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [currentPosition, setCurrentPosition] = useState('')
    const [isClosed, setIsClosed] = useState(false)

    useEffect(() => {
        if (isOpen) {
            modalRef.current.show();
            setIsClosed(false)
        } else {
            modalRef.current.close();
            setCurrentPosition('')
        }
    }, [isOpen]);
    const changePosition = () => {

        if (currentPosition === 'left') {
            setCurrentPosition('right')
        } else {
            setCurrentPosition('left')
        }
    }
    const closeModal = () => {
        // onClose()
        setIsClosed(true)
        setTimeout(() => {
            onClose()
        }, 1000)
    }
    const getStyles = () => {
        if (currentPosition === 'left') {
            return styles.positionLeft;
        } else if (currentPosition === 'right') {
            return styles.positionRight;
        } else {
            return ''
        }
    }
    return (
        <dialog
            id="modal"
            ref={modalRef}
            onClose={onClose}
            onKeyDown={(e) => {
                if (e.key == 'Escape') closeModal()
            }}
            className={`${styles.mainDialog} ${getStyles()} ${isClosed ? (styles.close) : ('')}`}>
            {children}
            <button className={styles.closeModal} onClick={() => closeModal()}><FontAwesomeIcon icon={faClose}/>
            </button>
            <button
                className={`${styles.sliderButton} ${currentPosition === 'left' ? (styles.leftRotate) : (styles.rightRotate)}`}
                onClick={() => changePosition()}><FontAwesomeIcon
                icon={faArrowLeft}/></button>
        </dialog>
    );
};

export default ModalComponent;
