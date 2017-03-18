import test from 'ava';
import EventEmitter from 'events';
import myHttp from '../src/http';

test('Should contain createServer function', t => {
  t.plan(2);

  t.true(myHttp.createServer && typeof myHttp.createServer === 'function');
  t.true(myHttp.createServer() instanceof EventEmitter);
});
