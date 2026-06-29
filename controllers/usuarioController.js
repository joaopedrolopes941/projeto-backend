const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastrar = async (req, res) => {

    const { nome, email, senha } = req.body;

    try {

        const senhaHash = await bcrypt.hash(senha, 10);

        const resultado = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1,$2,$3) RETURNING id,nome,email',
            [nome, email, senhaHash]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao cadastrar usuário'
        });

    }

};

exports.login = async (req, res) => {

    const { email, senha } = req.body;

    try {

        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE email=$1',
            [email]
        );

        if (resultado.rows.length == 0) {

            return res.status(401).json({
                erro: 'Usuário não encontrado'
            });

        }

        const usuario = resultado.rows[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {

            return res.status(401).json({
                erro: 'Senha incorreta'
            });

        }

        const token = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            token
        });

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no login'
        });

    }

};