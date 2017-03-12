import net from 'net';
import fs from 'fs-promise';
import path from 'path';
import mime from 'mime-types';
import HttpStatus from 'http-status-codes';
import { requestContainsEmptyLine, processBuffer, LINE_ENDING, EMPTY_LINE } from './utils/buffer';
import { processStartString, processHeaders } from './utils/request';
import getStatusCode from './utils/response';

const server = net.createServer();

/**
 * Путь к каталогу со статикой
 */
const STATIC_FOLDER = path.join(__dirname, '../static');

/**
 * Обработка ошибок
 * @param {Error} err
 */
const errorCallback = function errorCallback(err) {
  console.log(`[LOG] ${err}`);
};

// Обработка нового подключения
const handleSocket = function handleSocket(socket) {
  socket.on('error', errorCallback);

  const buffer = [];

  socket.on('readable', () => console.log('READABLE'));
  socket.on('end', () => console.log('END'));
  socket.on('close', () => console.log('CLOSE'));

  // parseHeader(socket, (err, header, stream) => {
  //   console.log('ERR', err);
  //   console.log('HEADER', header);
  //   console.log('STREAM', stream);
  // });

  socket.on('data', data => {
    console.log('DATA', data);
    console.log('DATA_LEN', data.length);

    const emptyLineIndex = data.indexOf(Buffer.from(EMPTY_LINE));
    console.log('BUFF', emptyLineIndex);

    console.log('HEADERS', emptyLineIndex === -1 ? data : data.slice(0, emptyLineIndex));
    console.log('BODY', data.slice(emptyLineIndex + 4));
    console.log('BODYDECODED', data.slice(emptyLineIndex + 4).toString('utf-8'));

    if (emptyLineIndex === -1) {
      // Если нету пустой строки, это всё заголовки
      buffer.push(data);
    } else {
      // Если есть пустая строка
      // Сохраняем остатки заголовков
      const remainHeaders = data.slice(0, emptyLineIndex);
      buffer.push(remainHeaders);

      // socket.removeListener('readable', () => {});
      // if (data.length) {
      //   socket.unshift(data);
      // }
    }

    if (!requestContainsEmptyLine(data)) {
      return;
    }

    const [rawStartString, ...rawRequestHeaders] = processBuffer(buffer);

    // Стартовая строка запроса
    const { method, uri, httpVersion } = processStartString(rawStartString);
    global.console.log('Request start string:', method, uri, httpVersion);

    // Заголовки запроса
    const headers = processHeaders(rawRequestHeaders);
    global.console.log('Request headers:', headers);

    if (method === 'POST') {
      socket.write(`${httpVersion} ${getStatusCode(HttpStatus.OK)}`);
      socket.write(LINE_ENDING);
      socket.write(LINE_ENDING);
      socket.end();
      return;
    }

    // Файл для отображения
    const filePath = path.join(STATIC_FOLDER, uri);

    fs
      .readFile(filePath)
      .catch(err => {
        // Нет файла
        if (err.code === 'ENOENT') {
          socket.write(`${httpVersion} ${getStatusCode(HttpStatus.NOT_FOUND)}`);
        }

        // Нет прав доступа к файлу
        if (err.code === 'EACCES' || err.code === 'EPERM') {
          socket.write(`${httpVersion} ${getStatusCode(HttpStatus.BAD_REQUEST)}`);
        }

        socket.write(EMPTY_LINE);
        socket.end();

        throw err;
      })
      .then(fileContent => {
        const contentType = mime.contentType(path.extname(filePath)) || 'application/octet-stream';

        socket.write(`${httpVersion} ${getStatusCode(HttpStatus.OK)}`);
        socket.write(LINE_ENDING);
        socket.write(`Content-Type: ${contentType}`);
        socket.write(LINE_ENDING);
        socket.write(`Content-Length: ${fileContent.length}`);
        socket.write(EMPTY_LINE);
        socket.end(fileContent);
      })
      .catch(errorCallback);
  });
};

process.on('uncaughtException', errorCallback);
process.on('unhandledRejection', errorCallback);

server.on('error', errorCallback);
server.on('connection', handleSocket);

server.listen(process.env.PORT || 3000);
