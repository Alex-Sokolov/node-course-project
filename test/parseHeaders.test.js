import test from 'ava';
import { parseStartString, parseHeaders } from '../src/utils/parseHeaders';

test('Should correct parse request start string', t => {
  t.plan(5);

  const fakeStartString = 'GET /foo.html HTTP/1.1';

  const startString = parseStartString(fakeStartString);

  t.true(startString instanceof Object);
  t.true(Object.keys(startString).length === 3);
  t.true(startString.method === 'GET');
  t.true(startString.url === '/foo.html');
  t.true(startString.httpVersion === 'HTTP/1.1');
});

test('Should correct parse request headers', t => {
  t.plan(5);

  const fakeHeaders = [
    'Host: localhost:3000',
    'Referer: http://localhost:3000/bar.html',
    'DNT: 1',
    'Connection: keep-alive',
    'Upgrade-Insecure-Requests: 1',
    'Pragma: no-cache',
    'Cache-Control: no-cache',
  ];

  const headers = parseHeaders(fakeHeaders);

  t.true(headers instanceof Object);
  t.true(Object.keys(headers).length === 7);
  t.true(headers.Host === 'localhost:3000');
  t.true(headers.DNT === '1');
  t.true(headers['Cache-Control'] === 'no-cache');
});
