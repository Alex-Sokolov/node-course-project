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

  // res.setHeader('Content-Type', 'application/json');
  // res.writeHead(200); // Вызов writeHead опционален

  // Вывод текстового файла
  const filePath = path.join(STATIC_FOLDER, req.url);
  const mimeType = mime.contentType(path.extname(filePath)) || 'application/octet-stream';

  console.log('FILEPATH', filePath);

  res.setHeader('Content-Type', mimeType);

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});
