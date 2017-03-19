import test from 'ava';
import { Readable } from 'stream';
import HttpRequest from '../src/httpRequest';

const fakeRequest = `GET /foo.html HTTP/1.1
Host: localhost:3000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:52.0) Gecko/20100101 Firefox/52.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Referer: http://localhost:3000/bar.html
DNT: 1
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache

`.replace('\n', '\r\n');

// TODO: Выполняется даже без t.pass
test.skip('Emit headers event when headers sent', t => {
  const fakeSocket = new Readable({
    read: () => {},
  });

  const requestStream = new HttpRequest(fakeSocket);
  requestStream.on('headers', () => {
    t.pass();
  });

  fakeSocket.push(fakeRequest);
});

test('HttpRequest stream is Readable Stream', t => {
  t.plan(1);

  const stream = new HttpRequest({
    on: () => {},
  });

  t.true(stream instanceof Readable);
});

// TODO: Наверное объединиить с тестом выше
test.todo('HttpRequest contain body without headers');

// TODO: Зависает
test.skip('Should correctly handle when headers come in multiple chunks', t => {
  const fakeSocket = new Readable({
    read: () => {},
  });

  const requestStream = new HttpRequest(fakeSocket);
  requestStream.on('headers', () => {
    t.end();
  });

  // eslint-disable-next-line no-bitwise
  const fakeRequestPart1 = fakeRequest.substr(0, ~~(fakeRequest.length / 2));
  const fakeRequestPart2 = fakeRequest.substr(fakeRequestPart1.length + 1);

  fakeSocket.push(fakeRequestPart1);
  setTimeout(() => fakeSocket.push(fakeRequestPart2));
});

test.todo('Should correctly handle headers when chunks split below \\r\\n & \\r\\n');
test.todo('Call to setHeader after headers have been sent should emit error');
test.todo('Call to writeHead should send headers with correct status line');
test.todo('Call to writeHead after head was already written should emit error');
test.todo('HttpRequest should emit close event if socket was closed');
test.todo('HttpRequest should NOT emit request till all headers have been sent');
