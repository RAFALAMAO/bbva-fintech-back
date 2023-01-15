const bcrypt = require("bcrypt");
import { UserQuery } from "../database/queries";

class LoginService {
  static async Login({ email, password, role }) {
    let response = {
			status: 200,
			message: 'Login success',
      jwtToken: '',
      data: {}
		};

    const userQuery = new UserQuery();

    try {
      const user =  await userQuery.findOne({ nombre: 'aaron' });

      response.data = user;
      return response;

    } catch (error) {
      console.log(error)
      response.message = 'error';
      response.status = 400;
      return response;
    }
  }
}
module.exports = LoginService;
