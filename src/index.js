//llamar los modulos en constantes
const express = require('express');
const morgan = require('morgan');
const app = express(); 
const path = require('path');

//settings

app.set('port', 3000);
app.set('views', path.join(__dirname, '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares funciones que se ejecuntan antes de que se prosece una ruta

app.use(morgan('dev')); 

//rutas del servidor

app.use(require('./routes/index'));


//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//listener escuchando el servidor

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});