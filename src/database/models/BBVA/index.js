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
const User_role = sequelize.import('./user_role');
const User_doctos = sequelize.import('./user_doctos');

// ========= Associations
User_role.hasMany(Users, { sourceKey: 'id', foreignKey: 'role_id' });
Users.belongsTo(User_role, { targetKey: 'id', foreignKey: 'role_id' });

Users.hasMany(User_doctos, { sourceKey: 'id', foreignKey: 'user_id' });
User_doctos.belongsTo(Users, { targetKey: 'id', foreignKey: 'user_id' });

// Models
const models = {
	Users,
	User_role,
	User_doctos
};

// include sequelize
models.sequelize = sequelize;

module.exports = models;