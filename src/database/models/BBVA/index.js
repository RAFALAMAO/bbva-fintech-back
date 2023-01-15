'use strict';

const Sequelize = require('sequelize');
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_TYPE,
  DB_NAME,
} from "../../../config/index";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_TYPE,
});

try {
	sequelize
		.authenticate()
		.then(() => {
			console.log(`Connection to DB ${DB_NAME} has been established successfully.`);
		})
		.catch((err) => {
			console.error('Unable to connect to the database:', err);
		});
} catch (e) {
	console.log(e);
}

// ========= Models import, ordered by group and association
const Users = sequelize.import('./users');

// ========= Associations


// Models
const models = {
	Users,
};

// include sequelize
models.sequelize = sequelize;

module.exports = models;