'use strict'

const express = require('express')
const bodyParser = require('body-parser')
//const hbs = require('express-handlebars')
//const cors = require('cors')
const app = express()
const path = require('path');
const userController = require('./user')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// PAGES ROUTES //
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/users.html'));
});


/*app.set('pages', path.join(__dirname, '../pages'));

app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: __dirname + '/styles'
}))*/



app.get('/api/users', userController.getUsers)
app.get('/api/users/:userId' , userController.getUser)
app.post('/public/users', userController.saveUser)
app.put('/api/users/:userId', userController.updateUser)
app.delete('/api/users/:userId', userController.deleteUser)

module.exports = app