import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EliminarGestiones = () => {
    const { id } = useParams(); // Obtiene el id de la URL
    const navigate = useNavigate(); // Para redirigir después de la eliminación

    const handleDelete = async () => {
        try {
            // Realiza la petición DELETE a la API
            await axios.delete(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            navigate('/gestiones');
        } catch (error) {
            console.error("Error al eliminar la gestión:", error);
        }
    };

    return (
        <div className="container">
            <h2>Eliminar Gestión</h2>
            <p>¿Estás seguro de que deseas eliminar esta gestión?</p>
            <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
            <button onClick={() => navigate('/gestiones')} className="btn btn-secondary">Cancelar</button>
        </div>
    );
};

export default EliminarGestiones;
