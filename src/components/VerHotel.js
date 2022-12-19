import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowBarLeft, MapFill } from 'react-bootstrap-icons';

const endpoint = process.env.REACT_APP_API_URL;

const VerHotel = () => {
    const [habitaciones, setHabitaciones] = useState([])
    const [nit_hotel, setNitHotel] = useState(0);
    const [nombre_hotel, setNombreHotel] = useState('');
    const [direccion_hotel, setDireccionHotel] = useState('');
    const [telefono_hotel, setTelefonoHotel] = useState(0);
    const [ciudad_hotel, setCiudadHotel] = useState('');
    const [descripcion_hotel, setDescripcionHotel] = useState('');
    const [numero_habitaciones_hotel, setNumeroHabitacionesHotel] = useState(0);
    const navigate = useNavigate()
    const { id } = useParams()


    const getAllHabitaciones = async () => {
        const response = await axios.get(`${endpoint}/tha/${id}`)
        setHabitaciones(response.data)
    }

    useEffect(() => {
        const getHotelById = async () => {
            const response = await axios.get(`${endpoint}/hotel/${id}`)
            setNitHotel(response.data.nit_hotel)
            setNombreHotel(response.data.nombre_hotel)
            setDireccionHotel(response.data.direccion_hotel)
            setTelefonoHotel(response.data.telefono_hotel)
            setCiudadHotel(response.data.ciudad_hotel)
            setDescripcionHotel(response.data.descripcion_hotel)
            setNumeroHabitacionesHotel(response.data.numero_habitaciones_hotel)
        }
        getHotelById()
        getAllHabitaciones()
    }, [])

    return (
        <div className='container fade-in-image my-5 w-50'>
            <div className='d-flex  justify-content-between'>
                <Link to="/" className='btn btn-primary '>
                    <ArrowBarLeft></ArrowBarLeft> Volver
                </Link>
            </div>

            <hr />
            <div className=''>
                <div className='row'>
                    <div className='col-12 sun mb-5'>
                        <h1>{nombre_hotel}</h1>
                        <h5>
                            <MapFill></MapFill> {ciudad_hotel}</h5>
                    </div>

                    <div className='col-12 d-flex'>
                        <h6>NIT: {nit_hotel}</h6>
                    </div>

                    <div className='col-12 p-0 mb-5'>
                        {descripcion_hotel}
                    </div>

                    <div className='col-12 d-flex align-items-start flex-column mb-2'>
                        <div><strong>Dirección: </strong> {direccion_hotel}</div>
                        <div><strong>Teléfono: </strong> {telefono_hotel}</div>
                        <div><strong>Ciudad: </strong> {ciudad_hotel}</div>
                        <div><strong>Número de Habitaciones: </strong> {numero_habitaciones_hotel}</div>
                    </div>
                    <hr />
                    <div className='d-flex align-items-end flex-column'>
                        <Link to={`/room/create/${id}`} className="btn btn-primary" >Agregar Habitación</Link>
                    </div>
                </div>
            </div>
            <div className='my-5'>
                <table className="table table-striped">
                    <thead className='bg-dec text-white'>
                        <tr>
                            <th scope="col">CANTIDAD</th>
                            <th scope="col">TIPO HABITACIÓN</th>
                            <th scope="col">ACOMODACIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones.map((habitacion) => (
                            <tr key={habitacion.id}>
                                <td>{habitacion.num_habitaciones}</td>
                                <td>{habitacion.descripcion_tipo_habitacion}</td>
                                <td>{habitacion.descripcion_acomodacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VerHotel