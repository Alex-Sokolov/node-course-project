import net from 'net';
import EventEmitter from 'events';

/**
 * Реализация нашего класса MyHttp
 */
export default class MyHttp extends EventEmitter {
  /**
   * Конструктор класса
   */
  constructor() {
    super();

    if (!(this instanceof MyHttp)) return new MyHttp();

    this.server = null;

    return this;
  }

  /**
   * Создание сервера
   */
  static createServer() {
    console.log('http createServer');
    this.server = net.createServer();

    this.server.on('connection', socket => {
      console.log('server connection', socket);
    });

    return this.server;
  }
}
