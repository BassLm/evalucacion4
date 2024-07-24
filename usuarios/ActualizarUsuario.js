import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarUsuario() {
    const { id } = useParams(); // Obtén el ID del usuario desde la URL
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        celular: ''
    });

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://144.126.210.74:8080/api/usuario/${id}`);
                setUsuario(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsuario();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://144.126.210.74:8080/api/usuario/${id}`, usuario);
            navigate('/usuarios');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>Actualizar Usuario</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input
                        type="text"
                        id="nombres"
                        name="nombres"
                        className="form-control"
                        value={usuario.nombres || ''} // Asegúrate de que el valor nunca sea undefined
                        onChange={handleChange}
                        placeholder="Ingresa los nombres"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        className="form-control"
                        value={usuario.apellidos || ''} // Asegúrate de que el valor nunca sea undefined
                        onChange={handleChange}
                        placeholder="Ingresa los apellidos"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={usuario.email || ''} // Asegúrate de que el valor nunca sea undefined
                        onChange={handleChange}
                        placeholder="Ingresa el email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input
                        type="text"
                        id="celular"
                        name="celular"
                        className="form-control"
                        value={usuario.celular || ''} // Asegúrate de que el valor nunca sea undefined
                        onChange={handleChange}
                        placeholder="Ingresa el número de celular"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    );
}

export default ActualizarUsuario;
