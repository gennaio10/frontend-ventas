import React, { createContext, useReducer } from "react";
import {
  ELIMINAR_CLIENTE,
  MODIFICAR_CLIENTE,
  OBTENER_CLIENTE,
  OBTENER_CLIENTES,
  REGISTRAR_CLIENTE,
} from "../const/actionTypes";
import clienteReducer from "../reducer/clienteReducer";
import axios from "axios";
import Swal from "sweetalert2";

export const ClienteContext = createContext();

export const ClienteContextProvider = (props) => {
  const initialState = { clientesList: [], clienteSeleccionado: null };
  const [state, dispatch] = useReducer(clienteReducer, initialState);

  const obtenerClientes = async () => {
    try {
      const resultado = await axios.get("/clientes");
      dispatch({
        type: OBTENER_CLIENTES,
        payload: resultado.data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener los clientes",
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
      console.log(error);
    }
  };

  const registrarClientes = async (cliente) => {
    try {
      console.log(cliente);
      const resultado = await axios.post("/clientes", cliente);
      dispatch({
        type: REGISTRAR_CLIENTE,
        payload: resultado.data,
      });

      Swal.fire({
        icon: "success",
        title: "Registrado",
        text: `Registrado: ${cliente.nombres} ${cliente.apellidos}`,
        toast: true,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el cliente",
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
      console.log(error);
    }
  };

  const obtenerCliente = async (cliente) => {
    try {
      let clienteEncontrado = null;
      if (cliente !== null) {
        const resultado = await axios.get(`/clientes/${cliente.idCliente}`);
        clienteEncontrado = resultado.data;
      } else {
        clienteEncontrado = cliente;
      }
      dispatch({
        type: OBTENER_CLIENTE,
        payload: clienteEncontrado,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener el cliente",
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
      console.log(error);
    }
  };

  const modificarCliente = async (cliente) => {
    try {
      const resultado = await axios.put("/clientes", cliente);
      dispatch({
        type: MODIFICAR_CLIENTE,
        payload: resultado.data,
      });

      Swal.fire({
        icon: "success",
        title: "Modificado",
        text: `Modificado: ${cliente.nombres} ${cliente.apellidos}`,
        toast: true,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo modificar el cliente",
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
      console.log(error);
    }
  };

  const eliminarCliente = async (cliente) => {
    try {
      Swal.fire({
        icon: "question",
        title: "¿Esta seguro?",
        text: `Se eliminara: ${cliente.nombres} ${cliente.apellidos}`,
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
      }).then(async (result) => {
        if (result.value) {
          const resultado = await axios.delete(
            `/clientes/${cliente.idCliente}`
          );
          dispatch({
            type: ELIMINAR_CLIENTE,
            payload: cliente.idCliente,
          });

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: `Eliminado: ${resultado.data.nombres} ${resultado.data.apellidos}`,
            toast: true,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el cliente",
        toast: true,
        timer: 1500,
        timerProgressBar: true,
      });
      console.log(error);
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        clientesList: state.clientesList,
        clienteSeleccionado: state.clienteSeleccionado,

        obtenerClientes,
        registrarClientes,
        obtenerCliente,
        modificarCliente,
        eliminarCliente,
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  );
};
