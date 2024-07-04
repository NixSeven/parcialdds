const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:4001', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const dbPath = './backend.db';
fs.unlinkSync(dbPath, { throwIfNoEntry: false });

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the backend database.');
});

db.run(`CREATE TABLE clientes (
    id INTEGER PRIMARY KEY,
    documento TEXT,
    tipo_documento TEXT,
    nombre TEXT,
    apellido TEXT,
    email TEXT,
    domicilio TEXT,
    cuit_cuil TEXT,
    fecha_nacimiento TEXT
)`, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        let stmt = db.prepare("INSERT INTO clientes (documento, tipo_documento, nombre, apellido, email, domicilio, cuit_cuil, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        for (let i = 0; i < 10; i++) {
            let tipo_documento = Math.random() < 0.5 ? 'DNI' : 'LC';
            stmt.run(`documento${i}`, tipo_documento, `nombre${i}`, `apellido${i}`, `email${i}@example.com`, `domicilio${i}`, `cuit_cuil${i}`, `1990-01-0${i}`);
        }
        stmt.finalize();
    }
});

app.get('/clientes', (req, res) => {
    db.all('SELECT * FROM clientes', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(rows);
        }
    });
});

app.post('/clientes', (req, res) => {
    const { documento, tipo_documento, nombre, apellido, email, domicilio, cuit_cuil, fecha_nacimiento } = req.body;
    const sql = 'INSERT INTO clientes (documento, tipo_documento, nombre, apellido, email, domicilio, cuit_cuil, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [documento, tipo_documento, nombre, apellido, email, domicilio, cuit_cuil, fecha_nacimiento], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM clientes WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ message: 'Cliente eliminado correctamente' });
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

module.exports = app;
