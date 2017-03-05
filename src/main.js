import net from 'net';
import fsp from 'fs-promise';
import path from 'path';
import mime from 'mime-types';
import HttpStatus from 'http-status-codes';
import { requestContainsEmptyLine, processBuffer, EMPTY_LINE } from './utils/buffer';
import { processStartString, processHeaders } from './utils/request';
import getStatusCode from './utils/response';

const server = net.createServer();

/**
 * Путь к каталогу со статикой
 */
const STATIC_FOLDER = path.join(__dirname, '../static');

server.on('error', err => {
  throw err;
});

server.on('connection', socket => {
  socket.on('error', err => {
    throw err;
  });

  let buffer = [];

  socket.on('data', data => {
    buffer.push(data);

    if (!requestContainsEmptyLine(data)) {
      return;
    }

    const [rawStartString, ...rawRequestHeaders] = processBuffer(buffer);
    buffer = [];

    // Стартовая строка запроса
    const { method, uri, httpVersion } = processStartString(rawStartString);
    global.console.log('Request start string:', method, uri, httpVersion);

    // Заголовки запроса
    const headers = processHeaders(rawRequestHeaders);
    global.console.log('Request headers:', headers);

    // Файл для отображения
    const filePath = path.join(STATIC_FOLDER, uri);

    fsp
      .readFile(filePath)
      .catch(err => {
        // Нет файла
        if (err.code === 'ENOENT') {
          socket.write(`${httpVersion} ${getStatusCode(HttpStatus.NOT_FOUND)}`);
        }
        // Нет прав доступа к файлу
        if (err.code === 'EACCES') {
          socket.write(`${httpVersion} ${getStatusCode(HttpStatus.BAD_REQUEST)}`);
        }

        socket.write(EMPTY_LINE);
        socket.end();

        throw err;
      })
      .then(fileContent => {
        // Определяем MIME-тип файла
        const fileType = mime.lookup(filePath) || 'application/octet-stream';

        socket.write(`${httpVersion} ${getStatusCode(HttpStatus.OK)}`);
        socket.write(`Content-Type: ${fileType}`);
        socket.write(`Content-Length: ${fileContent.length}`);
        socket.write(EMPTY_LINE);
        socket.end(fileContent);
      })
      .catch(err => {
        throw err;
      });
  });
});

server.listen(process.env.PORT || 3000);
