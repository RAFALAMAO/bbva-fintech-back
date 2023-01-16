'use strict';
export default (sequelize, DataTypes) => {
	const UserRole = sequelize.define(
		'user_role',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER(11),
			},

			role: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true
			},
		},
		{
			freezeTableName: true,
		}
	);

	// UserRole.sync();
	return UserRole;
};
