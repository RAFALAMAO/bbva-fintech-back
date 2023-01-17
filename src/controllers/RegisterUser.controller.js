import { RegisterUserService } from "../services";

class LoginController {

	static async RegisterUpdateUser(req, res) {
		const { user, application } = req.body;
		const { status, message, data, role } = await RegisterUserService.RegisterUpdateUser({ user, application });

		return res.status(status).json({ status, message, data, role });
	}

}

module.exports = LoginController;
