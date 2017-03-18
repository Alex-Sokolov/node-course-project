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

  const res = new HttpResponse({});

  t.true(res.setHeader && typeof res.setHeader === 'function');
});

test('setHeader method should overwrite header with the same name', t => {
  t.plan(6);

  const res = new HttpResponse({});

  t.true(Object.keys(res.headers).length === 0);

  res.setHeader('Content-Encoding', 'gzip');
  t.true(Object.keys(res.headers).length === 1);

  res.setHeader('Content-Type', 'text/plain');
  t.true(Object.keys(res.headers).length === 2);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  t.true(Object.keys(res.headers).length === 2);

  t.true(res.headers['Content-Encoding'] === 'gzip');
  t.true(res.headers['Content-Type'] === 'text/html; charset=utf-8');
});

// test.skip('All headers added with setheader should be sent to socket', t => {
//   t.fail();
// });

// test.skip('setHeader method should NOT sent headers', t => {
//   t.fail();
// });
