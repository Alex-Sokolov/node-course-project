import net from 'net';
import fsp from 'fs-promise';
import path from 'path';
import { requestContainsEmptyLine, processBuffer } from './utils/buffer';
import { processStartString, processHeaders } from './utils/request';
import generateResponse from './utils/response';

const server = net.createServer();

/**
 * Кодировка по умолчанию
 */
const ENCODING = 'utf-8';

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
      .readFile(filePath, { encoding: ENCODING })
      .then(generateResponse)
      .then(response => {
        socket.end(response, ENCODING);
      })
      .catch(err => {
        throw err;
      });
  });
});

server.listen(process.env.PORT || 3000);
