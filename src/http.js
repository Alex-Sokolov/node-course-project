import net from 'net';
import EventEmitter from 'events';
import HttpRequest from './httpRequest';
import HttpResponse from './httpResponse';

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
    console.log('[http createServer]');
    this.server = net.createServer();

    this.server.on('connection', socket => {
      console.log('[server connection]');

      const req = new HttpRequest(socket);
      const res = new HttpResponse(socket);

      // Обработка получения заголовков запроса
      req.on('headers', () => {
        console.log('[request ON HEADERS]');
        // или просто this?
        this.server.emit('request', req, res);
      });
    });

    return this.server;
  }
}