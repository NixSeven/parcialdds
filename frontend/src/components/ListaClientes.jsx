import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/clientes/${id}`);
      obtenerClientes(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  return (
    <Container>
      <h2>Lista de Clientes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Domicilio</th>
            <th>CUIT/CUIL</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.email}</td>
              <td>{cliente.domicilio}</td>
              <td>{cliente.cuit_cuil}</td>
              <td>{cliente.fecha_nacimiento}</td>
              <td>
                <Button variant="danger" onClick={() => eliminarCliente(cliente.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/" className="btn btn-primary mt-3">Volver</Link>
    </Container>
  );
};

export default ListaClientes;
