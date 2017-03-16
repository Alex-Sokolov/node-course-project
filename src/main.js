import fs from 'fs-promise';
import path from 'path';
import mime from 'mime-types';
import HttpStatus from 'http-status-codes';
import myHttp from './http';

// Каталог со статикой
const STATIC_FOLDER = path.join(__dirname, '../static');

// Обработка ошибок
const errorCallback = function errorCallback(err) {
  global.console.log(`[ERROR] ${err}`);
};

// Создание сервера
const server = myHttp.createServer();
server.listen(process.env.PORT || 3000);

// Обработка входящего запроса
server.on('request', (req, res) => {
  global.console.log(req.headers, req.method, req.url);

  // Если ничего не запрашивали
  if (req.url === '/') {
    res.writeHead(200);
    res.socket.end();
    return;
  }

  // Вывод запрошенного файла
  const filePath = path.join(STATIC_FOLDER, req.url);
  const mimeType = mime.contentType(path.extname(filePath)) || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);

  stream.on('open', () => {
    res.setHeader('Content-Type', mimeType);
    // TODO: не работает без его вызова
    res.writeHead(200); // Вызов writeHead опционален

    stream.pipe(res.socket);
  });

  stream.on('error', err => {
    // Нет файла
    if (err.code === 'ENOENT') {
      res.writeHead(HttpStatus.NOT_FOUND);
    }

    // Нет прав доступа к файлу
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      res.writeHead(HttpStatus.BAD_REQUEST);
    }

    res.socket.end();
  });
});

// Обработка ошибок
process.on('uncaughtException', errorCallback);
process.on('unhandledRejection', errorCallback);
server.on('error', errorCallback);
