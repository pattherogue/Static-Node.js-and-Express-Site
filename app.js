/* Seteup server, routes, and middleware */

/*  Variables for necessary dependencies */
const express = require('express');
const app = express();
const data = require('./data.json');

/* Setup middleware */
/* set "view engine" to "pug" */
app.set('view engine', 'pug');
/* static route and express.static method serve public folder */
app.use('/static', express.static('public'));

/* Set routes */
/* "index" route */
app.get('/', (req, res, next) => {
    res.locals = data.projects;
    const projects = data.projectss;
    res.render('index', {projects: projects});
});
/* "about" route */
app.get('/about', (req, res, next) => {
    res.render('about');
});
/* Dynamic "project" routes */
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects[projectId];
        if (project) {
            res.render('project', { projects })
        } else {
            next(newError(404));
        }
});

/* show 500 error */
app.get('/error', (req, res, next) => {
    const err = new Error();
    err.message = 'Custom 500 error thrown'
    err.status = 500;
    throw err;
});

/* 404 error handle */
app.use((req, res, next) => {
    next(newError(404));
});

/* Global error handler */
/* custom new Error() */
app.use((err, req, res, next) =>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err: {};
    /* status property 404 */
    if(err.status === 404) {
          /* err.status property */
        res.status(err.statusCode);
        /* message property user friendly message */
        err.message = 'Page not found.';
        /* log out err object's message and status */
        console.log(`${err.statusCode}: ${err.message}`);
        res.render('page-not-found', {err});
    } else {
        
        /* err.message */
        res.status(err.statusCode || 500);
        err.message = 'Problem with server.'
        /* log out err object's message and status */
        console.log(`{err.statusCOde}: ${err.message}`);
        res.render('error', {err});
    }
});

/* listen port 3000 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Application is now running on local host port: ${PORT}`)
});