const bcrypt = require("bcrypt");
import { UserQuery } from "../database/queries";

class registerUserService {
  static async RegisterUpdateUser({ user }) {
    let response = {
			status: 200,
			message: 'Register/update user success',
		};

    const userQuery = new UserQuery();
    console.log(user)

    try {
      if ( !user.correo_electronico || !user.contrasenia) {
        // user with provided email not found
        response.message = 'Al menos debe existir el correo y la contraseña';
        response.status = 200;
        return response;
      }

      const obtainedUser = await userQuery.findOne({
        where: {
          correo_electronico: user.correo_electronico
        }
      });

      if (obtainedUser) {
        // user with provided email not found
        response.message = 'Correo electronico ya registrado, intente con uno diferente.';
        response.status = 200;
        return response;
      }

      const hashedPassword = await bcrypt.hash(user.contrasenia, 12);
      user.role_id = 2;
      user.contrasenia = hashedPassword;
      const createdUser = await userQuery.createUserWithApplication(user);

      console.log(createdUser.id)

      return response;

    } catch (error) {
      console.log(error)
      response.message = 'error';
      response.status = 400;
      return response;
    }
  }
}
module.exports = registerUserService;
