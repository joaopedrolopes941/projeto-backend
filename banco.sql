CREATE TABLE usuarios (

    id SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    senha VARCHAR(255) NOT NULL

);

CREATE TABLE produtos (

    id SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    categoria VARCHAR(100) NOT NULL,

    quantidade INTEGER NOT NULL,

    valor NUMERIC(10,2) NOT NULL

);