import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
 
function ActualizarCliente(){
    const [id_cliente,setIdCliente] = useState("");
    const [dv,setDv] = useState("");
    const [nombres,setNombres] = useState("");
    const [apellidos,setApellidos] = useState("");
    const [email,setEmail] = useState("");
    const [celular,setCelular] = useState("");
    const navigate = useNavigate();
    let {id} = useParams();
 
    useEffect(() => {
        cargarDatosCliente();
    },[]);
 
    const cargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.210.74:8080/api/cliente/${id}`);
            const cliente = response.data[0];
 
            setIdCliente(cliente.id_cliente);
            setDv(cliente.dv);
            setNombres(cliente.nombres);
            setApellidos(cliente.apellidos);
            setEmail(cliente.email);
            setCelular(cliente.celular);
        } catch (error) {
            console.log(error);
        }
    }
 
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const cliente = {
                nombres,
                apellidos,
                email,
                celular
            };
            await axios.patch(`http://144.126.210.74:8080/api/cliente/${id}`,cliente);
            navigate("/clientes");
        } catch (error) {
            console.log(error);
        }
    }
 
    return(
        <div className="container">
            <h1>Actualizar cliente</h1>
            <hr></hr>
            <div className="card">
                <div className="card-header">Ingrese los datos solicitados</div>
                <div className="card-body">
                <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label>RUT</label>
                                <input type="text" className="form-control" value={id_cliente} disabled></input>
                            </div>
                            <div className="form-group">
                                <label>DV</label>
                                <input type="text" className="form-control" value={dv} disabled></input>
                            </div>
                            <div className="form-group">
                                <label>Nombres</label>
                                <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label>Apellidos</label>
                                <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <label>Celular</label>
                                <input type="text"  className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Actualizar cliente</button>
                            <Link to={`/clientes`} className="btn btn-secondary" >Cancelar</Link>
                        </form>
                </div>
            </div>
        </div>
 
    )
}
export default ActualizarCliente;