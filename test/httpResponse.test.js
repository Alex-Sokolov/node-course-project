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

// test.skip('All headers added with setheader should be sent to socket', t => {
//   t.fail();
// });

// test.skip('setHeader method should overwrite header with the same name', t => {
//   t.fail();
// });

// test.skip('setHeader method should NOT sent headers', t => {
//   t.fail();
// });
