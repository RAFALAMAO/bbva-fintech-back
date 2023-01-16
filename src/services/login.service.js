const bcrypt = require("bcrypt");
import { UserQuery } from "../database/queries";

class LoginService {
  static async Login({ email, password }) {
    let response = {
			status: 200,
			message: 'Login success',
      role: '',
      data: {}
		};

    const userQuery = new UserQuery();

    try {
      const user = await userQuery.getUserWithRole(email);

      if (!user) {
        // user with provided email not found
        response.message = 'Correo incorrecto. Por favor ingresar un correo válido';
        response.status = 200;
        return response;
      }

      const valid = await bcrypt.compare(password, user.contrasenia);
      if (!valid) {
        response.message = 'Contraseña incorrecta.';
        response.status = 200;
        return response;
      }

      response.role = user.user_role.role;

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
