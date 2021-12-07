/* Seteup server, routes, and middleware */

/*  Variables for necessary dependencies */
const express = require('express');
const { projects } = require('./data.json');
const app = express();


app.use(express.json());

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
app.get('/about', (req, res) => {
    res.render('about');
});
/* Dynamic "project" routes */
app.get('/projects/:id', (req, res, next) => {
    const id = req.params.id;
    const project = projects[id];
        if (project) {
            res.render('project', { project });
    } else {
            const err = new Error;
            err.status = 404
            err.message = `Project ${id} does not exist`;
            next(err);
        }
});

app.get('/error', (req, res, next) => {
    const err = new Error();
    err.message = 'Custom 500 error thrown'
    err.status = 500;
    throw err;
});

/* 404 error handle */
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* Global error handler */
/* custom new Error() */
app.use((err, req, res, next) =>{

    /* status property 404 */  
    if(err.status === 404) {
        /* message property user friendly message */ 
        console.log("The 404 Error Handler Has Been Called");
        res.status(404).render('page-not-found', { err });
    /* status property 500 */
    } else {
        /* message property user friendly message */ 
        console.log("The 500 Error Handler Has Been Called");
        res.status(err.status || 500).render('error', { err });
    }
});

/* listen port 3000 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application is now running on local host port: ${port}`)
});