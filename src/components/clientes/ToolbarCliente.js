import React, { useContext } from 'react';
import { ModalContext } from '../../contexts/modalContext';
import { ClienteContext } from '../../contexts/clienteContext'; 

const ToolbarCliente = () => {

    const { setshowModal, setsmodalTitle}  = useContext(ModalContext);
    const { obtenerCliente } = useContext(ClienteContext);

    const abrirModalCrear = () => {
        setsmodalTitle('Registrar nuevo cliente');
        setshowModal(true);
        obtenerCliente(null);
    };

    return (
        <div className="container">
            <button className="button is-small is-primary"
                    onClick={ () => abrirModalCrear() }>
                <span className="icon is-small">
                    <i className="fas fa-plus"></i>
                </span>
                <span>Nuevo</span>
            </button>
        </div>
    );
}
 
export default ToolbarCliente;