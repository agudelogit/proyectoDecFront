import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBarLeft, Sun } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = `${process.env.REACT_APP_API_URL}/hotel/`;

const CrearHotel = () => {
    const [nit_hotel, setNitHotel] = useState();
    const [nombre_hotel, setNombreHotel] = useState('');
    const [direccion_hotel, setDireccionHotel] = useState('');
    const [telefono_hotel, setTelefonoHotel] = useState();
    const [ciudad_hotel, setCiudadHotel] = useState('');
    const [descripcion_hotel, setDescripcionHotel] = useState('');
    const [numero_habitaciones_hotel, setNumeroHabitacionesHotel] = useState();
    const [id_usuario, setIdUsuario] = useState();
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        const response = await axios.post(endpoint, {
            nit_hotel: nit_hotel,
            nombre_hotel: nombre_hotel,
            direccion_hotel: direccion_hotel,
            telefono_hotel: telefono_hotel,
            ciudad_hotel: ciudad_hotel,
            descripcion_hotel: descripcion_hotel,
            numero_habitaciones_hotel: numero_habitaciones_hotel,
            id_usuario: id_usuario
        })

        if (!response.data.success) {
            if (response.data.message == 2) {
                toast.error('El NIT ya existe!', {
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
                toast.error('Error inesperado!, por favor verifica los campos', {
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
            navigate('/')
        }
    }

    return (
        <div className='container fade-in-image my-5 w-50'>
            <div className='d-flex  justify-content-between'>
                <Link to="/" className='btn btn-primary '>
                    <ArrowBarLeft></ArrowBarLeft> Volver
                </Link>
                <h3 className='sun'>Agregar Hotel <Sun></Sun></h3>
            </div>

            <hr />
            <form onSubmit={store}>
                <div className='row'>
                    <div className='col-12'>
                        <label className='form-label input-dec'>Nombre</label>
                        <input
                            value={nombre_hotel}
                            onChange={(e) => setNombreHotel(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Nit</label>
                        <input
                            value={nit_hotel}
                            onChange={(e) => setNitHotel(e.target.value)}
                            type='number'
                            className='form-control'
                            placeholder='Hasta 10 dígitos'
                        />
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Dirección</label>
                        <input
                            value={direccion_hotel}
                            onChange={(e) => setDireccionHotel(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Teléfono</label>
                        <input
                            value={telefono_hotel}
                            onChange={(e) => setTelefonoHotel(e.target.value)}
                            type='number'
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Ciudad</label>
                        <input
                            value={ciudad_hotel}
                            onChange={(e) => setCiudadHotel(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='col-12'>
                        <label className='form-label input-dec'>Descripción</label>
                        <input
                            value={descripcion_hotel}
                            onChange={(e) => setDescripcionHotel(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>N° Habitaciones</label>
                        <input
                            value={numero_habitaciones_hotel}
                            onChange={(e) => setNumeroHabitacionesHotel(e.target.value)}
                            type='number'
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                        <label className='form-label input-dec'>Usuario</label>
                        <input
                            value={id_usuario}
                            onChange={(e) => setIdUsuario(e.target.value)}
                            type='number'
                            className='form-control'
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

export default CrearHotel