//llamar los modulos en constantes
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const mongoose = require('mongoose');

const app = express(); 

//coneting DB

// mongoose
//     .connect('mongodb://localhost/resources')
//     .then(db => console.log('db connected'))
//     .catch(err => console.log('type error mongoDB', err));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares funciones que se ejecuntan antes de que se prosece una ruta

app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false}));

//rutas del servidor

app.use(require('./routes/index'));


//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//listener escuchando el servidor

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});