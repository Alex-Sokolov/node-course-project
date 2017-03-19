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

test('setHeader method should NOT sent headers', t => {
  t.plan(2);

  const res = new HttpResponse({});

  t.true(res.headersSent === false);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  t.true(res.headersSent === false);
});

// TODO: Зависает
test.skip('Call to setHeader after headers have been sent should emit error', t => {
  // t.plan(1);

  const res = new HttpResponse({});
  res.headersSent = true;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  res.on('readable', () => {});
  res.on('error', () => {
    t.end();
  });
});

test.todo('Call to writeHead should send headers with corresponding status line');
test.todo('Call to writeHead after head was already written should emit error');
test.todo('All headers added with setheader should be sent to socket');
test.todo('Should correctly set response headers');
