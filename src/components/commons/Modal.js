import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/modalContext';

const Modal = (props) => {

    const { showModal, modalTitle, setshowModal }  = useContext(ModalContext);

    return (
        <div className={`modal ${showModal ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{modalTitle}</p>
                    <button className="delete" aria-label="close" onClick={ () => setshowModal(false) }></button>
                </header>
                <section className="modal-card-body">
                    { props.children }
                </section>
            </div>
        </div>
    );
}
 
export default Modal;