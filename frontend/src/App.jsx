import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Registro from './components/Registro';
import ListaClientes from './components/ListaClientes';
import Menu from './components/Menu';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <div> 
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={<ListaClientes />} />
      </Routes>
    </div>
  );
};

export default App;
