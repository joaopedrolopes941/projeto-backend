const pool = require('../models/db');

exports.listar = async (req, res) => {

    try {

        const resultado = await pool.query(
            'SELECT * FROM produtos ORDER BY id'
        );

        res.status(200).json(resultado.rows);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao listar produtos'
        });

    }

};

exports.cadastrar = async (req, res) => {

    const { nome, categoria, quantidade, valor } = req.body;

    try {

        const resultado = await pool.query(

            `INSERT INTO produtos
            (nome,categoria,quantidade,valor)
            VALUES($1,$2,$3,$4)
            RETURNING *`,

            [nome, categoria, quantidade, valor]

        );

        res.status(201).json(resultado.rows[0]);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro ao cadastrar produto'
        });

    }

};