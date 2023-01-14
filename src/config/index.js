require('dotenv').config();

// === DATABASE
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_TYPE = process.env.DB_TYPE;
const DB_NAME = process.env.DB_NAME;

// === API
const API_TOKEN = process.env.API_TOKEN;

// Seleccion de entorno
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	DB_TYPE,
	DB_NAME,
	API_TOKEN,
	NODE_ENV,
};
