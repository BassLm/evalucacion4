import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ActualizarGestiones() {
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGestiones = async () => {
            try {
                const response = await axios.get(`http://tu-api.com/api/gestiones/${id}`);
                const { nombre, descripcion, fecha } = response.data;
                setNombre(nombre);
                setDescripcion(descripcion);
                setFecha(fecha);
            } catch (error) {
                console.error("Error al obtener la gestión:", error);
            }
        };
        fetchGestiones();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://tu-api.com/api/gestiones/${id}`, {
                nombre,
                descripcion,
                fecha
            });
            navigate("/gestiones");
        } catch (error) {
            console.error("Error al actualizar la gestión:", error);
        }
    };

    return (
        <div className="container">
            <h1>Actualizar Gestión</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Fecha</label>
                    <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Gestión</button>
            </form>
        </div>
    );
}

export default ActualizarGestiones;
