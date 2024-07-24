import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearUsuario() {
    const [idUsuario, setIdUsuario] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://144.126.210.74:8080/api/usuario', {
                id_usuario: idUsuario,
                dv,
                nombres,
                apellidos,
                email,
                celular: parseInt(celular), // Asegúrate de que celular sea un número
                username,
                password,
                fecha_registro: new Date().toISOString()
            });
            navigate("/usuarios");
        } catch (error) {
            if (error.response) {
                console.log("Error de respuesta:", error.response.data);
                console.log("Estado de error:", error.response.status);
            } else if (error.request) {
                console.log("Error de solicitud:", error.request);
            } else {
                console.log("Error:", error.message);
            }
            console.log("Config de solicitud:", error.config);
        }
    };

    return (
        <div className="container">
            <h1>Agregar Usuario</h1>
            <hr />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>ID Usuario</label>
                    <input type="text" className="form-control" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>DV</label>
                    <input type="text" className="form-control" value={dv} onChange={(e) => setDv(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Nombres</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Apellidos</label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Celular</label>
                    <input type="text" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
            </form>
        </div>
    );
}

export default CrearUsuario;
