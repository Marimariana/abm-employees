const http = require('http');
const port = 3000;

const handle = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hola Mundo, no está trucado!');
};

const server = http.createServer(handle);

server.listen(port, err => {
  if (err) {
    return console.log('explotó algo al poner el server a la escucha', err)
  }

  console.log(`el servidor esta a la escucha en el puerto ${port}`)
});