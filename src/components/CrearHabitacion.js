import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowBarLeft, Sun } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = process.env.REACT_APP_API_URL;

const CrearHabitacion = () => {
    const [hotel, setHotel] = useState([])
    const [tiposHabitacions, setTiposHabitacions] = useState([])
    const [acomodacion, setAcomodacion] = useState([])
    const [id_tipo_habitacion, setId_tipo_habitacion] = useState('');
    const [id_acomodacion, setId_acomodacion] = useState('');
    const [num_habitaciones, setNum_habitaciones] = useState(0);
    const { id } = useParams()
    const navigate = useNavigate()

    const getHotel = async (id) => {
        const response = await axios.get(`${endpoint}/hotel/${id}`);
        setHotel(response.data)
        getTiposHabitacion()
    }

    const getTiposHabitacion = async () => {
        const response = await axios.get(`${endpoint}/room/`);
        setTiposHabitacions(response.data)
        setId_tipo_habitacion(1)
        getAcomodaciones(1)
    }

    const getAcomodaciones = async (id_tipo_habitacion) => {
        if (id_tipo_habitacion == 1) {
            const response2 = await axios.get(`${endpoint}/acomodacion/`);
            response2.data = response2.data.filter(acomod => acomod.id <= 2)
            setAcomodacion(response2.data)
            setId_acomodacion(1)
        }

        if (id_tipo_habitacion == 2) {
            const response2 = await axios.get(`${endpoint}/acomodacion/`);
            response2.data = response2.data.filter(acomod => acomod.id > 2)
            setAcomodacion(response2.data)
            setId_acomodacion(3)
        }

        if (id_tipo_habitacion == 3) {
            const response2 = await axios.get(`${endpoint}/acomodacion/`);
            response2.data = response2.data.filter(acomod => acomod.id <= 3)
            setAcomodacion(response2.data)
            setId_acomodacion(1)
        }
    }
    useEffect(() => {
        getHotel(id)

    }, [])

    const store = async (e) => {
        e.preventDefault()
       
        const response = await axios.post(`${endpoint}/tha/`, {
            id_hotel: id,
            id_tipo_habitacion: id_tipo_habitacion,
            id_acomodacion: id_acomodacion,
            num_habitaciones: num_habitaciones
        })
        console.log(response.data)
        if (!response.data.success) {
            if (response.data.message == 3) {
                toast.error('Número de habitaciones excedido!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else if (response.data.message == 2) {
                toast.error('La combinación de datos ya existe!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            } else {
                toast.error('Error!, por favor verifica los campos', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            }
        } else {
            toast.success('Agregado con éxito!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate(`/${id}`)
        }
       
        //navigate('/')
    }
    return (
        <div className='container fade-in-image my-5 w-50'>
            <div className='d-flex  justify-content-between'>
                <Link to={`/${id}`} className='btn btn-primary '>
                    <ArrowBarLeft></ArrowBarLeft> Volver
                </Link>
                <h3 className='sun'>Agregar Habitación <Sun></Sun></h3>
            </div>

            <hr />
            <form onSubmit={store}>
                <div className='row'>
                    <div className='col-12'>
                        <h6>HOTEL: {hotel.nombre_hotel}</h6>
                    </div>
                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Tipo Habitación</label>
                        <select
                            value={id_tipo_habitacion}
                            onChange={(e) => {
                                setId_tipo_habitacion(e.target.value)
                                getAcomodaciones(e.target.value)
                            }}
                            className='form-control'
                            placeholder='Hasta 10 dígitos'>
                            {tiposHabitacions.map((tipo) => {
                                return <option key={tipo.id} value={tipo.id}>{tipo.descripcion_tipo_habitacion}</option>
                            })}
                        </select>
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Acomodación</label>
                        <select
                            value={id_acomodacion}
                            onChange={(e) => setId_acomodacion(e.target.value)}
                            className='form-control'
                        >
                            {acomodacion.map((acomodacion) => {
                                return <option key={acomodacion.id} value={acomodacion.id}>{acomodacion.descripcion_acomodacion}</option>
                            })}
                        </select>
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Número de habitaciones</label>
                        <input
                            value={num_habitaciones}
                            onChange={(e) => setNum_habitaciones(e.target.value)}
                            type='number'
                            className='form-control'
                            placeholder=''
                        />
                    </div>

                    <div className='my-5'>

                        <button
                            type='submit'
                            className='btn btn-primary'>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CrearHabitacion