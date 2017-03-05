import net from 'net';
import { requestContainsEmptyLine, processBuffer } from './utils/buffer';
import { processStartString, processHeaders } from './utils/request';
import generateResponse from './utils/response';
import getStaticFileContents from './utils/files';

const server = net.createServer();

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

    const startHeader = processStartString(rawStartString);

    global.console.log('Request start string:');
    global.console.log(startHeader.requestType, startHeader.requestPath, startHeader.httpVersion);

    const headers = processHeaders(rawRequestHeaders);

    global.console.log('Request headers:');
    global.console.log(headers);

    // Пробуем показать файл
    if (startHeader.requestPath !== '/') {
      getStaticFileContents(startHeader.requestPath)
        .then(generateResponse)
        .then(response => {
          socket.end(response, 'utf-8');
        })
        .catch(err => {
          throw err;
        });
    }
  });
});

server.listen(process.env.PORT || 3000);
