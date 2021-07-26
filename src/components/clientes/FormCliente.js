import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/modalContext';
import { ClienteContext } from '../../contexts/clienteContext'; 

const FormCliente = () => {

    const { setshowModal }  = useContext(ModalContext);
    const { registrarClientes, clienteSeleccionado, obtenerCliente, modificarCliente } = useContext(ClienteContext);

    const clienteDefault = {
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: ''
    };

    const [cliente, setCliente] = useState(clienteDefault);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {

        if(clienteSeleccionado !== null){
            setCliente({
                ...clienteSeleccionado
            });
        } else {
            setCliente(clienteDefault);
        }
        // eslint-disable-next-line 
    }, [clienteSeleccionado]); 

    const handleChange = e => {
        setCliente({
          ...cliente,
          [e.target.name] : e.target.value
        })
    };

    const handleOnSubmit = e => {
        //evita que se recarga la pagina
        e.preventDefault();

        //validar
        if (cliente.nombres.trim() === '' && cliente.apellidos.trim() === '' && cliente.email.trim() === '') {
            setMensaje('Los nombres, apellidos y el email son obligatorios.');
            return; 
        }

        //obtener objeto a enviar
        if(clienteSeleccionado !== null){
            modificarCliente(obtenerClienteAEnviar());
        }else {
            registrarClientes(obtenerClienteAEnviar());
        }

        //cerrar y limpiar el modal
        cerrarModal();
    };

    const limpiarForm = () => {
        setMensaje(null);
        setCliente(clienteDefault);
    };

    const cerrarModal = () => {
        limpiarForm();
        setshowModal(false);
        obtenerCliente(null);
    };

    const obtenerClienteAEnviar = () => {
        let clienteTemp = {...cliente};

        //elimnar del objeto cliente los atributos que no tienen un valor (retira del json)
        if(clienteTemp.direccion === "") delete clienteTemp.direccion;
        if(clienteTemp.telefono === "") delete clienteTemp.telefono;
        if(clienteTemp.email === "") delete clienteTemp.email;
        if(clienteTemp.apellidos === "") delete clienteTemp.apellidos;
        if(clienteTemp.nombres === "") delete clienteTemp.nombres;
        return clienteTemp;
    };

    return (
        <form onSubmit={handleOnSubmit}>
            
        { mensaje ? <div className="notification is-danger">{mensaje}</div> : null }

        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">Nombre Completo</label>
            </div>
            <div className="field-body">
            <div className="field">
                <p className="control is-expanded has-icons-left">
                <input
                    autoComplete="off"
                    className="input"
                    type="text"
                    placeholder="Nombre"
                    name="nombres"
                    value={cliente.nombres}
                    onChange={handleChange}
                />
                <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                </span>
                </p>
            </div>
            <div className="field">
                <p className="control is-expanded">
                <input
                    autoComplete="off"
                    className="input"
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={cliente.apellidos}
                    onChange={handleChange}
                />
                </p>
            </div>
            </div>
        </div>

        <div className="field is-horizontal">
            <div className="field-label is-normal">
            <label className="label">Direccion</label>
            </div>
            <div className="field-body">
            <div className="field">
                <div className="control is-expanded has-icons-left">
                <input
                    autoComplete="off"
                    className="input"
                    type="text"
                    placeholder="Ingrese su direccion"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleChange}
                />
                <span className="icon is-small is-left">
                    <i className="fas fa-map-marked-alt"></i>
                </span>
                </div>
            </div>
            </div>
        </div>

        <div className="field is-horizontal">
            <div className="field-label is-normal">
            <label className="label">Telefono</label>
            </div>
            <div className="field-body">
            <div className="field">
                <div className="control is-expanded has-icons-left">
                <input
                    autoComplete="off"
                    className="input"
                    type="text"
                    placeholder="Telefono"
                    name="telefono"
                    value={cliente.telefono}
                    onChange={handleChange}
                />
                <span className="icon is-small is-left">
                    <i className="fas fa-phone"></i>
                </span>
                </div>
            </div>
            </div>
        </div>

        <div className="field is-horizontal">
            <div className="field-label is-normal">
            <label className="label">Email</label>
            </div>
            <div className="field-body">
            <div className="field">
                <div className="control is-expanded has-icons-left">
                <input
                    autoComplete="off"
                    className="input"
                    type="email"
                    placeholder="Ingrese su Email"
                    name="email"
                    value={cliente.email}
                    onChange={handleChange}
                />
                <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                </span>
                </div>
            </div>
            </div>
        </div>

        <div className="field is-horizontal">
            <div className="field-label">
            </div>
            <div className="field-body">
            <div className="field">
                <div className="control">
                <button type="submit" className="button is-primary mr-1">Guardar</button>
                <button type="button" className="button" onClick={ () => cerrarModal() }>Cancelar</button>
                </div>
            </div>
            </div>
        </div>
        </form>
    );
}
 
export default FormCliente;