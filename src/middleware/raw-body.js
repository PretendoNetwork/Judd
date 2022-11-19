const express = require('express');

const rawBodyMiddleware = express.raw({
	type: '*/*',
	verify(request, response, buffer, encoding) {
		request.rawBody = buffer;
	}
});

module.exports = rawBodyMiddleware;