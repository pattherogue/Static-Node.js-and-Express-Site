/* Seteup server, routes, and middleware */

/*  Variables for necessary dependencies */
const express = require('express');
const app = express();
const path = require('path');
const { projects } = require('./data.json');

/* Setup middleware */
/* set "view engine" to "pug" */
app.set('view engine', 'pug');
/* static route and express.static method serve public folder */
app.use('/static', express.static('public'));

/* Set routes */
/* "index" route */
app.get('/', (req, res, next) => {
    res.render('index', { projects });
});
/* "about" route */
/* Dynamic "project" routes */

/* listen port 3000 */