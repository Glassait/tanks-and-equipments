const express = require('express');
const path = require('path');
const server = express();

// set up rate limiter: maximum of sixty requests per minute
const RateLimit = require('express-rate-limit');

const limiter = RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60,
});

// apply rate limiter to all requests
server.use(limiter);

server.use(express.static(__dirname + '/dist/tanks-and-equipments'));
server.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname + '/dist/tanks-and-equipments/index.html'));
});
server.listen(process.env.PORT || 8080);
