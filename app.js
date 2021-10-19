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

/* Handle errors */
/* custom new Error() */
/* status property 404 */
/* message property user friendly message */

/* err.status property */
/* err.message */
/* log out err object's message and status */
app.use((err, req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err: {};
    if(err.status === 404) {
        res.status(err.statusCode);
        err.message = 'Page not found.';
        console.log(`${err.statusCode}: ${err.message}`);
        res.render('page-not-found', {err});
    } else {
        res.status(err.statusCode || 500);
        err.message = 'Problem with server.'
        console.log(`{err.statusCOde}: ${err.message}`);
        res.render('error', {err});
    }
});