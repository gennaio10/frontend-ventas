import React, { useContext } from "react";
import { ModalContext } from "../../contexts/modalContext";
import { ClienteContext } from "../../contexts/clienteContext";

const RowCliente = ({ clienteRC }) => {

  console.log(clienteRC);

  const { setshowModal, setsmodalTitle } = useContext(ModalContext);
  const { obtenerCliente, eliminarCliente } = useContext(ClienteContext);

  const modificarCliente = () => {
    obtenerCliente(clienteRC);
    setsmodalTitle("Modificar cliente");
    setshowModal(true);
  };

  const removerCliente = () => {
    eliminarCliente(clienteRC);
  };

  return (
    <tr key={clienteRC.idCliente}>
      <td>
        <button
          className="button is-small is-info mr-1"
          title="Modificar"
          onClick={() => modificarCliente()}
        >
          <span className="icon is-small">
            <i className="fas fa-edit"></i>
          </span>
        </button>
        <button
          className="button is-small is-danger"
          title="Eliminar"
          onClick={() => removerCliente()}
        >
          <span className="icon is-small">
            <i className="fas fa-trash-alt"></i>
          </span>
        </button>
      </td>
      <td>{clienteRC.idPersona.nombres}</td>
      <td>{clienteRC.idPersona.apellidos}</td>
      <td>{clienteRC.idPersona.direccion}</td>
      <td>{clienteRC.idPersona.telefono}</td>
      <td>{clienteRC.email}</td>
    </tr>
  );
};

export default RowCliente;
