require('dotenv').config();

const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API TechStore funcionando!'
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});