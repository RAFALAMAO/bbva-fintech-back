import { API_TOKEN } from '../config/index';

const validateApiToken = (req, res, next) => {
	try {
		if ( req.get('api-token') === API_TOKEN ) {
			next();
		} else {
			res.status(401).json({
				status: 401,
				message: 'Unauthorized',
			});
		}
	} catch (e) {
		next(e);
	}
};

module.exports = {
	validateApiToken,
};
