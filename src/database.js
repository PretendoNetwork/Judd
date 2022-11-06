const mongoose = require('mongoose');
const config = require('../config.json');
const { connection_string, options } = config.mongoose;

let connection;

async function connect() {
	await mongoose.connect(connection_string, options);

	connection = mongoose.connection;
	connection.on('error', console.error.bind(console, 'connection error:'));

	module.exports.connection = connection;
}

module.exports = {
	connect
};