import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CrearGestiones() {
    const [idUsuario, setIdUsuario] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [idTipoGestion, setIdTipoGestion] = useState("");
    const [idResultado, setIdResultado] = useState("");
    const [comentarios, setComentarios] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function obtenerFechaHora() {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleString('es-ES', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
        return fechaFormateada;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Validar los campos
        if (!idUsuario || !idCliente || !idTipoGestion || !idResultado || !comentarios) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        const fechaRegistro = obtenerFechaHora(); // Fecha actual en formato compatible con MySQL

        try {
            // Verificar si el id_resultado es válido antes de enviar la solicitud
            const resultadoResponse = await axios.get(`http://144.126.210.74:8080/api/resultado/${idResultado}`);
            if (resultadoResponse.status !== 200) {
                throw new Error('El ID Resultado no es válido.');
            }

            await axios.post('http://144.126.210.74:8080/api/gestion', {
                id_usuario: parseInt(idUsuario),
                id_cliente: parseInt(idCliente),
                id_tipo_gestion: parseInt(idTipoGestion),
                id_resultado: parseInt(idResultado),
                comentarios,
                fecha_registro: fechaRegistro
            });
            navigate("/gestiones");
        } catch (error) {
            console.error("Error al crear la gestión:", error);

            // Manejo del error para mostrar un mensaje adecuado
            let errorMessage = "Error al crear la gestión. Por favor, intente de nuevo.";

            if (error.response && error.response.data) {
                if (typeof error.response.data === 'object') {
                    errorMessage = error.response.data.error?.sqlMessage || JSON.stringify(error.response.data);
                } else {
                    errorMessage = error.response.data;
                }
            }

            setError(errorMessage);
        }
    };

    return (
        <div className="container">
            <h1>Agregar Gestión</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>ID Usuario</label>
                    <input type="number" className="form-control" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>ID Cliente</label>
                    <input type="number" className="form-control" value={idCliente} onChange={(e) => setIdCliente(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>ID Tipo Gestión</label>
                    <input type="number" className="form-control" value={idTipoGestion} onChange={(e) => setIdTipoGestion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>ID Resultado</label>
                    <input type="number" className="form-control" value={idResultado} onChange={(e) => setIdResultado(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Comentarios</label>
                    <textarea className="form-control" value={comentarios} onChange={(e) => setComentarios(e.target.value)} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear Gestión</button>
            </form>
        </div>
    );
}

export default CrearGestiones;
