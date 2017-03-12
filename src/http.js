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
    this.server = net.createServer();

    return this;
  }

  /**
   * Прослушивание порта
   * @param {Number} port
   */
  static listen(port) {
    this.server.listen(process.env.PORT || port);

    return this;
  }
}
