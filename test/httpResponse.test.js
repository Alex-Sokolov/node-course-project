import test from 'ava';
import { Writable } from 'stream';
import HttpResponse from '../src/httpResponse';

test('HttpResponse stream is Writable Stream', t => {
  t.plan(1);

  const stream = new HttpResponse({});

  t.true(stream instanceof Writable);
});

test('HttpResponse have setHeader method', t => {
  t.plan(1);

  const fakeSocket = {};
  const res = new HttpResponse(fakeSocket);

  t.true(res.setHeader && typeof res.setHeader === 'function');
});
