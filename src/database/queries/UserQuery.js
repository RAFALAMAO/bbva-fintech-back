import MasterQuery from "./MasterQuery";
import BBVAModels from "../models/BBVA";

export default class UserQuery extends MasterQuery {
  constructor() {
    const userModel = BBVAModels.Users;
    super(userModel);

    this.userModel = userModel;
  }

  async getUserWithRole(email) {
    const obtainedUser = await this.userModel.findOne({
      include: [
        {
          model: BBVAModels.User_role,
        },
      ],
      where: {
        correo_electronico: email,
      },
    });

    return obtainedUser;
  }

	async getUsersDocs() {
    const obtainedUsersDoctos = await this.userModel.findAll({
      include: [
        { model: BBVAModels.User_doctos },
        { model: BBVAModels.Application },
      ],
      where: {
				role_id: 2
      },
    });

    return obtainedUsersDoctos;
  }

  async createUserWithApplication(data) {
    const obtainedUsersDoctos = await this.userModel.create(data, {
      include: [
        { model: BBVAModels.Application },
      ],
    });

    return obtainedUsersDoctos;
  }
}