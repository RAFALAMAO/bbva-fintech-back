'use strict';
export default (sequelize, DataTypes) => {
	const Application = sequelize.define(
		'application',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(11),
			},
			user_id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				references: {
					model: "users",
					key: "id",
    				onDelete: 'CASCADE',
				}
			},

			nivel_estudios: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			nombre_institucion: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			nombre_articulo: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			has_publicado: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			enlaces: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			gustarias_laborar: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			revista: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
		},
		{
			freezeTableName: true,
		}
	);

	// Application.sync();
	return Application;
};
