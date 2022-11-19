const express = require('express');
const morgan = require('morgan');
const rawBodyMiddleware = require('./middleware/raw-body');
const copyRequestStreamMiddleware = require('./middleware/copy-request-stream');
const database = require('./database');
const config = require('../config.json');

const splatoon = require('./titles/splatoon');

const app = express();
const { port } = config.http;

app.use(morgan('dev'));
app.use(rawBodyMiddleware);
app.use(copyRequestStreamMiddleware);
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
	console.log(error);
	// * 5XX means a server error, but this would be a 4XX client error
	// * (wrong body or hash provided)
	// * Real server sends this, however, so leave as is
	return response.status(500).send('error');
});

async function main() {
	await database.connect();

	await app.listen(port);

	console.log(`Server listening on http://localhost:${port}`);
}

main().catch(console.error);