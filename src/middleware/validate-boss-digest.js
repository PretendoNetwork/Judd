const crypto = require('crypto');

function validateBOSSDigestMiddleware(request, response, next) {
	const calculatedHash = crypto.createHash('sha1').update(request.rawBody).digest('hex');
	const expectedHash = request.headers['x-boss-digest'];

	if (calculatedHash !== expectedHash) {
		return next('Provided BOSS digest does not match the calculated hash');
	}

	next();
}

module.exports = validateBOSSDigestMiddleware;