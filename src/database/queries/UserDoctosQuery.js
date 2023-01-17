import MasterQuery from "./MasterQuery";
import BBVAModels from "../models/BBVA";

export default class UserDoctosQuery extends MasterQuery {
   constructor() {
      const userDoctosModel = BBVAModels.User_doctos;
      super(userDoctosModel);

      this.userDoctosModel = userDoctosModel;
   }

   async createOrUpdate(user_id, urlDocto) {
      const obtainedUser = await this.userDoctosModel.findOne({
         where: {
            user_id: user_id
         }
      });

      const newDocto = {
         user_id: user_id,
         url: urlDocto
      };

      if( obtainedUser ){
         await this.userDoctosModel.update(newDocto, {
            where: {
               user_id: user_id
            }
         });
      } else {
         await this.userDoctosModel.create(newDocto);
      }

      return obtainedUser;
   }
}