// Класс для работы с ответом
import { Writable } from 'stream';

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

    console.log('[HttpResponse]');

    // Socket
    this.socket = socket;

    // Заголовки ответа
    this.headers = {};

    // Флаг отправлены ли заголовки
    this.headersSent = false;

    return this;
  }

  // Установка заголовка
  static setHeader() {
    // устанавливаем заголовок
  }

  // Запись
  static _write() {
    // проверяем что отправлены заголовки
    // если нет отправляем
  }

  // Отправка всех заголовков в socket
  sendHeaders() {
    if (this.headersSent === true) {
      // заголовки уже отправлялись, выкидываем ошибку
    }

    // метод который отправляет все заголовки
    this.headersSent = true;
  }
}
