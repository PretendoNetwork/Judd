const router = require('express').Router();
const titles = require('../titles');

router.post('/post', async (request, response, next) => {
	const title = titles[request.titleCode];

	const resultType = title.type;
	const ResultTypeModel = title.result_model;

	const result = new ResultTypeModel({
		type: resultType,
		bossUniqueId: request.headers['x-boss-uniqueid'],
		bossDigest: request.headers['x-boss-digest'],
		resultData: request.resultData
	});

	try {
		await result.save();
	} catch (error) {
		return next(error);
	}
	

	return response.send('success');
});

module.exports = router;