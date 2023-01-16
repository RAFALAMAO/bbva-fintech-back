'use strict';
export default (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'users',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(11),
			},
			role_id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				references: {
					model: "user_role",
					key: "id"
				}
			},

			primer_nombre: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			apellido_paterno: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			apellido_materno: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			correo_electronico: {
				type: DataTypes.STRING(90),
				allowNull: true,
			},
			contrasenia: {
				type: DataTypes.STRING(60),
				allowNull: true,
			},

		},
		{
			freezeTableName: true,
		}
	);

	// Users.sync();
	return Users;
};
