const { Schema, model } = require('mongoose');

const ResultSchema = new Schema({
	type: String,
	bossUniqueId: String,
	bossDigest: String
}, {
	timestamps: true
});

const Result = model('Result', ResultSchema, 'results');

module.exports = {
	ResultSchema,
	Result,
};