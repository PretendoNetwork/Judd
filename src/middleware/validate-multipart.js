const titles = require('../titles');

function validateMultipartMiddleware(request, response, next) {
	const title = titles[request.titleCode];

	const multipartValidator = title.multipart_validator;
	const validationSchema = title.validation_schema;

	multipartValidator(request.copy, response, error => {
		if (error) {
			return next(error);
		}

		const resultData = {
			...request.copy.body,
		};

		for (const key in request.copy.files) {
			if (Object.hasOwnProperty.call(request.copy.files, key)) {
				const field = request.copy.files[key];

				for (const file of field) {
					resultData[file.fieldname] = file.buffer;
				}
			}
		}

		const validationResult = validationSchema.validate(resultData);

		if (validationResult.error) {
			return next(validationResult.error);
		}

		request.resultData = validationResult.value;

		next();
	});
}

module.exports = validateMultipartMiddleware;