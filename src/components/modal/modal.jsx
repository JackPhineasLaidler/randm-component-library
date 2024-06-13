import React, { useEffect, useState } from "react"
import styles from './modal.module.scss'
import CloseButton from "@/app/shared/components/buttons/close/CloseButton";

const Modal = (props) => {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(props.modalVisible);
    }, [props.modalVisible]);


    return (
        <>
            {showModal ?
                <>
                    <div className={styles.modal__overlay} onClick={props.handleModalClosed ? () => props.handleModalClosed() : () => setShowModal(false)}></div>

                    <div className={styles.modal__container}  onClick={props.handleModalClosed ? () => props.handleModalClosed() : () => setShowModal(false)}>
                        <div className={styles.modal__inner}  onClick={props.handleModalClosed ? () => props.handleModalClosed() : () => setShowModal(false)}>
                            <div className={`${styles.modal} ${props.modalStyles}`} >
                                <span className={`${styles.modal__button}`}>
                                    <CloseButton onClickFunction={props.handleModalClosed ? () => props.handleModalClosed() : () => setShowModal(false)}></CloseButton>
                                </span>
                                {props.children}
                            </div>
                        </div>
                    </div>
            </>
            : null
            }
        </>
    )
};

export default Modal;
