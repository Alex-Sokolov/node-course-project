import fs from 'fs-promise';
import myHttp from './http';

const server = myHttp.createServer();

server.on('request', (req, res) => {
  global.console.log(req.headers, req.method, req.url);

  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200); // Вызов writeHead опционален
  fs.createReadStream('somefile.txt').then(stream => stream.pipe(res));
});
