import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Configuración de Axios
axios.defaults.baseURL = 'http://144.126.210.74:8080';
axios.defaults.timeout = 5000; // 5 segundos
axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

function ListarGestiones() {
    const [gestiones, setGestiones] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchGestiones();
    }, []);

    const fetchGestiones = async () => {
        try {
            const response = await axios.get('/api/gestion/');
            setGestiones(response.data);
        } catch (error) {
            console.error("Error al obtener las gestiones:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta gestión?')) {
            try {
                await axios.delete(`/api/gestion/${id}`);
                fetchGestiones();
                alert('Gestión eliminada con éxito');
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    const errorMessage = error.response.data.error;
                    if (errorMessage.code === "ER_ROW_IS_REFERENCED_2") {
                        alert("No se puede eliminar esta gestión porque está siendo utilizada en otras partes del sistema.");
                    } else {
                        alert(`Error: ${errorMessage.sqlMessage}`);
                    }
                } else {
                    console.error('Error:', error);
                    alert('Ocurrió un error al intentar eliminar la gestión.');
                }
            }
        }
    };

    const filteredGestiones = gestiones.filter(gestion =>
        gestion.comentarios.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Lista de Gestiones</h1>
            <input
                type="text"
                className="form-control"
                placeholder="Buscar por comentarios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>ID Gestión</th>
                        <th>ID Usuario</th>
                        <th>ID Cliente</th>
                        <th>ID Tipo Gestión</th>
                        <th>ID Resultado</th>
                        <th>Comentarios</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGestiones.map(gestion => (
                        <tr key={gestion.id_gestion}>
                            <td>{gestion.id_gestion}</td>
                            <td>{gestion.id_usuario}</td>
                            <td>{gestion.id_cliente}</td>
                            <td>{gestion.id_tipo_gestion}</td>
                            <td>{gestion.id_resultado}</td>
                            <td>{gestion.comentarios}</td>
                            <td>{new Date(gestion.fecha_registro).toLocaleString()}</td>
                            <td>
                                <Link to={`/gestiones/actualizar/${gestion.id_gestion}`} className="btn btn-warning">Editar</Link>
                                <button onClick={() => handleDelete(gestion.id_gestion)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListarGestiones;