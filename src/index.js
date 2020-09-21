//llamar los modulos en constantes
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
//initializations
const app = express(); 
require('./database');
require('./passport/local-auth')

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares funciones que se ejecuntan antes de que se prosece una ruta

app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'myscretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.registrerMessage = req.flash('registrerMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    app.locals.user = req.user;
    next();
});

//rutas del servidor

app.use(require('./routes/index'));


//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//listener escuchando el servidor

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});