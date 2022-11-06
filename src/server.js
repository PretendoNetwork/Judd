const express = require('express');
const morgan = require('morgan');
const database = require('./database');
const config = require('../config.json');

const splatoon = require('./titles/splatoon');

const app = express();
const { port } = config.http;

app.use(morgan('dev'));
app.use(splatoon);

// * 404 error handler
app.use((request, response) => {
	const protocol = request.protocol;
	const hostname = request.hostname;
	const opath = request.originalUrl;

	const fullUri = `${protocol}://${hostname}${opath}`;

	console.warn(`HTTP 404 at ${fullUri}`);

	response.sendStatus(404);
});

// * Need to define all 4 of these to pick up errors
app.use((error, request, response, next) => {
	// TODO - Figure out better http codes
	console.log(error);
	response.status(400).send(error.message);
});

async function main() {
	await database.connect();

	await app.listen(port);

	console.log(`Server listening on http://localhost:${port}`);
}

main().catch(console.error);