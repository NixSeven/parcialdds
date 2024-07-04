import axios from 'axios';

const API_URL = 'http://localhost:4001/api';

const getClientes = async () => {
    try {
        const response = await axios.get(`${API_URL}/clientes`);
        console.log('Datos de clientes recibidos:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
};

const guardarCliente = async (cliente) => {
    try {
        const response = await axios.post(`${API_URL}/clientes`, cliente, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Cliente guardado:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // El servidor ha respondido con un código de error
            console.error('Error de respuesta:', error.response.data);
        } else if (error.request) {
            // La solicitud se hizo pero no se recibió respuesta
            console.error('Error de solicitud:', error.request);
        } else {
            // Otro tipo de error
            console.error('Error:', error.message);
        }
        throw error;
    }
};

const eliminarCliente = async (idCliente) => {
    try {
        const response = await axios.delete(`${API_URL}/clientes/${idCliente}`);
        console.log(`CLIENTE con ID ${idCliente} eliminado`);
        return response.data;
    } catch (error) {
        console.error(`Error al intentar eliminar CLIENTE con ID ${idCliente}:`, error);
        throw error;
    }
};

const clientesServicio = {
    getClientes,
    guardarCliente,
    eliminarCliente
};

export default clientesServicio;