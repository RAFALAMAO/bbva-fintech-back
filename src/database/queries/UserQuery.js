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
            }
         ],
         where: {
            correo_electronico: email
         }
      });

      return obtainedUser;
   }
}