const http = require('http');

const app = require('./modules/router')
const port = 3000;
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/employees';

const mongo = mongoose.connect(url, {useNewUrlParser: true , useUnifiedTopology: true  });
  mongo.then(() => {
    console.log('Conexión a la base de datos establecida...');
  }).catch((err) => {
    console.log('Error al conectar a la base de datos', err);

})

app.listen(port, err => {
  if (err) {
    return console.log('explotó algo con el server', err)
  }

  console.log(`el servidor esta a la escucha en el puerto ${port}`)
});

/*const handle = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hola Mundo, no está trucado!');
};

const server = http.createServer(handle);*/