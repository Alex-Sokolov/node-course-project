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

    this.server = null;

    return this;
  }

  /**
   * Создание сервера
   */
  static createServer() {
    this.server = net.createServer();

    this.server.on('connection', socket => {
      const req = new HttpRequest(socket);
      const res = new HttpResponse(socket);

      // Обработка получения заголовков запроса
      req.on('headers', () => {
        this.server.emit('request', req, res);
      });
    });

    return this.server;
  }
}
