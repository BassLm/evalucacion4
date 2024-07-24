import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EliminarGestiones() {
    const navigate = useNavigate();
    const [gestion, setGestion] = useState({});
    const [error, setError] = useState("");
    const { id } = useParams();

    useEffect(() => {
        cargarDatosGestion();
    }, []);

    const cargarDatosGestion = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            setGestion(response.data);
        } catch (error) {
            console.log(error);
            setError("Error al cargar los datos de la gestión.");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.210.74:8080/api/tipo_gestion/${id}`);
            navigate("/gestiones");
        } catch (error) {
            console.log(error);
            if (error.response) {
                setError("No es posible eliminar. Gestión está siendo utilizada.");
            }
        }
    };

    return (
        <div className="container">
            <h1>Eliminar Gestión</h1>
            <hr />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="card">
                <div className="card-header">Datos de la gestión a eliminar</div>
                <div className="card-body">
                    <h2>¿Desea eliminar la gestión?</h2>
                    <h3>{gestion.nombre_tipo_gestion}</h3>
                    <p>Fecha de Registro: {new Date(gestion.fecha_registro).toLocaleDateString()}</p>
                    <button className="btn btn-danger" onClick={onSubmit}>Eliminar Gestión</button>
                </div>
            </div>
        </div>
    );
}

export default EliminarGestiones;
