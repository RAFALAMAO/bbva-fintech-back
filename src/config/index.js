require('dotenv').config();

// Seleccion de entorno
const NODE_ENV = process.env.NODE_ENV;

const handlerHost = (node_env) => {
	if( node_env === 'development' ){
		return '127.0.0.1';
	} else {
		return process.env.DB_HOST;
	}
}

// === DATABASE
const DB_HOST = handlerHost(NODE_ENV);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_TYPE = process.env.DB_TYPE;
const DB_NAME = process.env.DB_NAME;

//AZURE_STORAGE
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

// === API
const API_TOKEN = process.env.API_TOKEN;

module.exports = {
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	DB_TYPE,
	DB_NAME,
	API_TOKEN,
	NODE_ENV,
	AZURE_STORAGE_CONNECTION_STRING,
	AZURE_STORAGE_CONTAINER_NAME
};
