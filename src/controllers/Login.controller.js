import { LoginService } from "../services";

class LoginController {

	static async Login(req, res) {
		const { email, password } = req.body;
		const { status, message, data, role } = await LoginService.Login({ email, password });

		return res.status(status).json({ status, message, data, role });
	}

}

module.exports = LoginController;
