import MasterQuery from "./MasterQuery";
import BBVAModels from "../models/BBVA";

export default class UserQuery extends MasterQuery {
   constructor() {
      const userModel = BBVAModels.Users;
      super(userModel);

      this.userModel = userModel;
   }
}