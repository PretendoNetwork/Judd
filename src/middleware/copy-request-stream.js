const stream = require('node:stream');

function copyRequestStreamMiddleware(request, response, next) {
	request.copy = stream.Readable.from(request.rawBody);
	request.copy.headers = request.headers;

	next();
}

module.exports = copyRequestStreamMiddleware;