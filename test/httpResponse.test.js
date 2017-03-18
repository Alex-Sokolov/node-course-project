import test from 'ava';
import HttpResponse from '../src/httpResponse';

test('HttpResponse have setHeader method', t => {
  t.plan(1);

  const fakeSocket = {};
  const res = new HttpResponse(fakeSocket);

  if (res.setHeader && typeof res.setHeader === 'function') {
    t.pass();
  }
});
