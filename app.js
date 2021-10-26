/* Seteup server, routes, and middleware */

/*  Variables for necessary dependencies */
const express = require('express');
const app = express();
const data = require('./data.json');
const { projects } = require('./data-json');

app.use(express.json());

/* Setup middleware */
/* set "view engine" to "pug" */
app.set('view engine', 'pug');
/* static route and express.static method serve public folder */
app.use('/static', express.static('public'));

/* Set routes */
/* "index" route */
app.get('/', (req, res) => {
    res.render('index', { projects });
});
/* "about" route */
app.get('/about', (req, res) => {
    res.render('about');
});
/* Dynamic "project" routes */
app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects[projectId];
        if (project) {
            res.render('project', { project })
        } else {
            next();
        }
});

/* show 500 error */
app.get('/error', (req, res, next) => {

    /* Error log */
    console.log('New error message and status properties')
    const err = new Error();
    err.message = 'Custom 500 error thrown'
    err.status = 500;
    throw err;
});

/* 404 error handle */
app.use((req, res, next) => {
    console.log(" 404 Error");
    const err = new Error('Not Found');
    err.status = 404;
    res.status(404).render('page-not-found');
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application is now running on local host port: ${PORT}`)
});