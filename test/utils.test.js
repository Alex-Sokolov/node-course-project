import test from 'ava';
import { convertBufferToStringArray } from '../src/utils';

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

test('Should convert buffer to string array', t => {
  t.plan(2);

  const fakeBuffer = Buffer.from(fakeRequest);

  const stringArray = convertBufferToStringArray(fakeBuffer);

  t.true(stringArray instanceof Array);
  t.true(stringArray[0] === 'GET /foo.html HTTP/1.1');
});
