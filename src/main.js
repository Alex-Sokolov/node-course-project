import net from 'net';
import fsp from 'fs-promise';
import path from 'path';
import HttpStatus from 'http-status-codes';
import { requestContainsEmptyLine, processBuffer } from './utils/buffer';
import { processStartString, processHeaders } from './utils/request';
import generateResponse from './utils/response';

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
    const startHeader = processStartString(rawStartString);

    global.console.log('Request start string:');
    global.console.log(startHeader.requestType, startHeader.requestPath, startHeader.httpVersion);

    // Заголовки запроса
    const headers = processHeaders(rawRequestHeaders);

    global.console.log('Request headers:');
    global.console.log(headers);

    // Показываем файл
    const filePath = path.join(STATIC_FOLDER, startHeader.requestPath);

    fsp
      .readFile(filePath)
      .then(fileContent => generateResponse(200, fileContent))
      .catch(err => {
        // Нет файла
        if (err.code === 'ENOENT') {
          return generateResponse(HttpStatus.NOT_FOUND, '');
        }

        // Нет прав доступа к файлу
        if (err.code === 'EACCES') {
          return generateResponse(HttpStatus.BAD_REQUEST, '');
        }

        throw err;
      })
      .then(response => {
        socket.end(response);
      })
      .catch(err => {
        throw err;
      });
  });
});

server.listen(process.env.PORT || 3000);
