import fs from 'fs-promise';
import path from 'path';
import mime from 'mime-types';
import myHttp from './http';

const STATIC_FOLDER = path.join(__dirname, '../static');

const server = myHttp.createServer();
server.listen(process.env.PORT || 3000);

server.on('request', (req, res) => {
  global.console.log(req.headers, req.method, req.url);
  // global.console.log('RES', res);

  if (req.url === '/') {
    res.writeHead(200);
    res.socket.end();
    return;
  }

  // Вывод текстового файла
  const filePath = path.join(STATIC_FOLDER, req.url);
  const mimeType = mime.contentType(path.extname(filePath)) || 'application/octet-stream';

  res.setHeader('Content-Type', mimeType);
  res.writeHead(200); // Вызов writeHead опционален

  const stream = fs.createReadStream(filePath);
  stream.on('open', () => {
    stream.pipe(res.socket);
  });

  stream.on('error', err => {
    res.end(err);
  });
});
