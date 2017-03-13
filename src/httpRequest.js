// Класс для работы с запросом
import { Readable } from 'stream';

/**
 * Реализация нашего класса HttpRequest
 */
export default class HttpRequest extends Readable {
  /**
   * Конструктор класса
   */
  constructor(socket) {
    super(socket);

    if (!(this instanceof HttpRequest)) return new HttpRequest(socket);

    console.log('[HttpRequest]');

    // Socket с данными запроса
    this.socket = socket;

    // Состояние запроса (headers/body)
    this.state = 'HEADERS';

    return this;
  }

  // Чтение запроса
  static _read() {
    console.log('[HttpRequest _read]');
    this.socket.resume();
  }

  // Обработка заголовков
  processHeaders() {
    console.log('[HttpRequest processHeaders]', this.socket);
  }

  // Обработчик события data на socket
  onData(data) {
    // Если получаем тело запроса
    if (this.state === 'BODY') {
      this.push(data);
      this.socket.pause();
    }

    // Если получаем заголовки

    // Если state headers то
    // записываем в буфер
    // если там встречается пустая строка
    // если нет ждем следующее событие data
    // если да то processHeaders
    // unshift лишнего кусочка
    // emit headers
    // поменять состояние state = body
    // socket.pause();
  }
}
