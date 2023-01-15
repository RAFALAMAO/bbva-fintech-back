import { LoginService } from "../services";

class LoginController {

	static async Login(req, res) {
		const { email, password } = req.body;
		const role = req.get('role');
		const { status, message, jwtToken, data } = await LoginService.Login({ email, password, role });

		return res.status(status).json({ status, message, jwtToken, data });
	}

}

module.exports = LoginController;
