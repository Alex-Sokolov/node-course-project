import test from 'ava';
import EventEmitter from 'events';
import myHttp from '../src/http';

test('Should contain createServer function', t => {
  t.plan(2);

  if (typeof myHttp.createServer === 'function') {
    t.pass();
  }

  if (myHttp.createServer() instanceof EventEmitter) {
    t.pass();
  }
});
