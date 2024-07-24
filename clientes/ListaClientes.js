import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaClientes() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/cliente?_size=500');
                console.log(response.data); // Verifica la respuesta aquí
                setClientes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchClientes();
    }, []);

    return (
        <div className="container">
            <h1>Lista de clientes</h1>
            <hr />
            <div className="mb-3">
                <a href="/clientes/agregar" className="btn btn-primary">Agregar cliente</a>
            </div>
            <div className="card">
                <div className="card-header">Lista de clientes registrados</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>RUT</th>
                                <th>DV</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length > 0 ? (
                                clientes.map((cliente) => (
                                    <tr key={cliente.id_cliente}>
                                        <td>{cliente.id_cliente}</td>
                                        <td>{cliente.dv}</td>
                                        <td>{cliente.nombres}</td>
                                        <td>{cliente.apellidos}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.celular}</td>
                                        <td>
                                            <Link to={`/clientes/eliminar/${cliente.id_cliente}`} className="btn btn-danger">Eliminar</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No hay clientes registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListaClientes;
