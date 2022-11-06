const express = require('express');
const subdomain = require('express-subdomain');

const post = require('./post');

// Router to handle the subdomain
const splatoon = express.Router();

// Setup routes
//logger.info('[SPLATOON] Applying imported routes');
splatoon.use(post);

// Main router for endpoints
const router = express.Router();

// Create subdomains
//logger.info('[SPLATOON] Creating wup-agmj subdomain');
router.use(subdomain('wup-agmj.app', splatoon));

module.exports = router;