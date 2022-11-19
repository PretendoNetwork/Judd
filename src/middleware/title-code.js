const titles = require('../titles');

function titleCodeMiddleware(request, response, next) {
	request.titleCode = request.subdomains.pop();

	if (!titles[request.titleCode]) {
		return next(`No valid title config set for title code ${request.titleCode}`);
	}

	next();
}

module.exports = titleCodeMiddleware;