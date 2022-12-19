import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Trash, PencilSquare, Sun } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const endpoint = process.env.REACT_APP_API_URL;

const MostrarHoteles = () => {
    const [hotels, setHotels] = useState([])

    useEffect(() => {
        getAllHoteles()
    }, [])

    const getAllHoteles = async () => {
        const response = await axios.get(`${endpoint}/hotels`)
        setHotels(response.data)
    }

    const deleteHotel = async (id) => {
        const response = await axios.delete(`${endpoint}/hotel/${id}`)

        if (response.data.success == true) {
            toast.success('Elimiado con éxito!', {
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
            toast.error('Error inesperado!, No se ha logrado eliminar', {
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
        getAllHoteles()
    }

    return (
        <div className='container fade-in-image mb-5'>
            <div className='d-grid gap-2 d-flex justify-content-between mt-5 mb-2'>
                <div className='sun d-flex align-items-center'>
                    <Sun></Sun>
                    <div>Listado de Hoteles</div>
                </div>
                <Link to="/create" className='btn btn-primary text-white'>Nuevo </Link>
            </div>

            <div className='table-responsive'>
                <table className='table table-striped'>
                    <thead className='bg-dec text-white'>
                        <tr>

                            <th>Nit</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Ciudad</th>
                            <th>Descripción</th>
                            <th>Habitaciones</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel.id}>

                                <td title={hotel.nit_hotel} >
                                    <Link to={`/${hotel.id}`} className="">
                                        {hotel.nit_hotel}
                                    </Link>
                                </td>
                                <td title={hotel.nombre_hotel} > {hotel.nombre_hotel} </td>
                                <td title={hotel.direccion_hotel} > {hotel.direccion_hotel.substring(0, 8)}... </td>
                                <td title={hotel.telefono_hotel} > {hotel.telefono_hotel} </td>
                                <td title={hotel.ciudad_hotel} > {hotel.ciudad_hotel} </td>
                                <td title={hotel.descripcion_hotel} > {hotel.descripcion_hotel.substring(0, 8)}... </td>
                                <td title={hotel.numero_habitaciones_hotel} > {hotel.numero_habitaciones_hotel} </td>
                                <td className='d-flex justify-content-between'>
                                    <Link to={`/edit/${hotel.id}`} className='btn btn-warning btn-sm'>
                                        <PencilSquare></PencilSquare>
                                    </Link>
                                    <button onClick={() => deleteHotel(hotel.id)} className='btn btn-danger btn-sm'>
                                        <Trash></Trash>
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MostrarHoteles
