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
app.get('/about', (req, res, next) => {
    res.render('about');
});
/* Dynamic "project" routes */
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects[id];
        if (project) {
            res.render('project', { projects })
        } else {
            next(newError(404));
        }
});

/* listen port 3000 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Application is now running on local host port: ${PORT}`)
});