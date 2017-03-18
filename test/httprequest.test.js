import test from 'ava';
import { Readable } from 'stream';
import HttpRequest from '../src/httpRequest';

test('HttpRequest stream is Readable Stream', t => {
  t.plan(1);

  const stream = new HttpRequest({
    on: () => {},
  });

  t.true(stream instanceof Readable);
});
