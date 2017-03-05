import net from 'net';
import { requestContainsEmptyLine, processBuffer } from './utils/buffer';
import { processStartString, processHeaders } from './utils/request';

const server = net.createServer();

server.on('connection', socket => {
  let buffer = [];
  socket.on('data', data => {
    buffer.push(data);

    if (requestContainsEmptyLine(data)) {
      const [startString, ...headers] = processBuffer(buffer);

      processStartString(startString);
      processHeaders(headers);

      buffer = [];
    }
  });
});

server.listen(process.env.PORT || 3000);
