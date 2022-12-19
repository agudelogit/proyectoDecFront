import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MostrarHoteles from './components/MostrarHoteles';
import CrearHotel from './components/CrearHotel';
import EditarHotel from './components/EditarHotel';
import VerHotel from './components/VerHotel';
import CrearHabitacion from './components/CrearHabitacion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    <div className="App fade-in-image">
      <nav className="navbar navbar-dark text-white bg-dec">
        <h1 className='container'>Administrador de Hoteles</h1>        
      </nav>
      <small>Walther Alejandro Agudelo Herrera</small>

      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MostrarHoteles/>} />
          <Route path='/create' element={<CrearHotel/>} />
          <Route path='/edit/:id' element={<EditarHotel/>} />
          <Route path='/:id' element={<VerHotel/>} />
          <Route path='/room/create/:id' element={<CrearHabitacion/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;