import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://144.126.210.74:8080/api/usuario?_size=500');
                console.log(response.data); // Verifica la respuesta aquí
                setUsuarios(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsuarios();
    }, []);

    return (
        <div className="container">
            <h1>Lista de Usuarios</h1>
            <hr />
            <div className="mb-3">
                <Link to="/usuarios/agregar" className="btn btn-primary">Agregar Usuario</Link>
            </div>
            <div className="card">
                <div className="card-header">Lista de Usuarios Registrados</div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id_usuario}>
                                        <td>{usuario.nombres}</td>
                                        <td>{usuario.apellidos}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.celular}</td>
                                        <td>
                                            <Link to={`/usuarios/actualizar/${usuario.id_usuario}`} className="btn btn-warning">Actualizar</Link>
                                            <Link to={`/usuarios/eliminar/${usuario.id_usuario}`} className="btn btn-danger">Eliminar</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No hay usuarios registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListaUsuarios;
