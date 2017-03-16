// Класс для работы с ответом
import HttpStatus from 'http-status-codes';
import { Writable } from 'stream';
import { LINE_ENDING } from './utils';

/**
 * Реализация нашего класса HttpResponse
 */
export default class HttpResponse extends Writable {
  /**
   * Конструктор класса
   */
  constructor(socket) {
    super(socket);

    if (!(this instanceof HttpResponse)) return new HttpResponse(socket);

    // Socket
    this.socket = socket;

    // Заголовки ответа
    this.statusCode = 200;
    this.headers = {};

    // Флаг отправлены ли заголовки
    this.headersSent = false;

    return this;
  }

  // Установка заголовка
  static setHeader(name, value) {
    this.headers[name] = value;

    return this;
  }

  static writeHead(code) {
    this.statusCode = code;

    return this;
  }

  // Запись
  static _write() {
    // проверяем что отправлены заголовки
    // если нет отправляем
    if (!this.headersSent) {
      this.sendHeaders();
    }
  }

  // Отправка всех заголовков в socket
  sendHeaders() {
    console.log('SEND HEADERS');

    if (this.headersSent) {
      this.emit('error', new Error('Заголовки уже отправлялись'));
    }

    // Стартовая строка
    this.socket.write(`HTTP/1.1 ${this.statusCode} ${HttpStatus.getStatusText(this.statusCode)}`);
    this.socket.write(LINE_ENDING);

    // Отправляем заголовки
    Object.keys(this.headers).forEach(header => {
      this.socket.write(`${header}: ${this.headers[header]}`);
      this.socket.write(LINE_ENDING);
    });

    this.socket.write(LINE_ENDING);

    // метод который отправляет все заголовки
    this.headersSent = true;
  }
}
