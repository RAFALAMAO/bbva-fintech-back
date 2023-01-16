'use strict';
export default (sequelize, DataTypes) => {
	const UserDoctos = sequelize.define(
		'user_doctos',
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

			url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			freezeTableName: true,
		}
	);

	// UserDoctos.sync({alter:true});
	return UserDoctos;
};
