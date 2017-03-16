// Класс для работы с запросом
import { Readable } from 'stream';
import { EMPTY_LINE, convertBufferToStringArray } from './utils';
import { parseStartString, parseHeaders } from './utils/parseHeaders';

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

    // Состояние запроса (headers/body)
    this.state = 'HEADERS';

    // Буфер для заголовков
    this.buffer = Buffer.from([]);

    // Socket с данными запроса
    this.socket = socket;
    this.socket.on('data', data => this.onData(data));

    // Параметры запроса
    this.headers = {};
    this.method = '';
    this.url = '';

    return this;
  }

  // Чтение запроса
  static _read() {
    this.socket.resume();
  }

  // Обработчик события data на socket
  onData(data) {
    // Если получаем тело запроса
    if (this.state === 'BODY') {
      this.push(data);
      this.socket.pause();
      return;
    }

    // Если получаем заголовки
    // определяем есть ли пустая строка между заголовками и телом запроса
    this.buffer = Buffer.concat([this.buffer, data]);
    const emptyLineIndex = this.buffer.indexOf(Buffer.from(EMPTY_LINE));

    // Если нет пустой строки, ждём её дальше
    if (emptyLineIndex === -1) {
      this.socket.pause();
      return;
    }

    // Если есть пустая строка

    // Получаем кусочек буфера, что относится уже к телу запроса
    const chunk = this.buffer.slice(emptyLineIndex + Buffer.from(EMPTY_LINE).length);
    console.log('CHUNK LENGTH', chunk.length);

    // В буфере оставляем только заголовки
    this.buffer = this.buffer.slice(0, emptyLineIndex);
    console.log('BUFFER LENGTH', this.buffer.length);

    // Если был кусочек тела запроса, аншифтим его обратно
    // this.socket.removeListener('readable', () => {});
    if (chunk.length) {
      console.log('NEED UNSHIFT CHUNK', chunk);
      this.socket.unshift(chunk);
    }

    // Генерируем событие с заголовками
    this.processHeaders();
    this.emit('headers');

    // Переключаемся в ожидание тела запроса
    this.state = 'BODY';

    this.socket.pause();
  }

  // Обработка заголовков
  processHeaders() {
    const [startString, ...headersArray] = convertBufferToStringArray(this.buffer);

    // Парсинг стартовой строки запроса
    const { method, url } = parseStartString(startString);
    this.method = method;
    this.url = url;

    // Парсинг заголовков
    const headers = parseHeaders(headersArray);
    this.headers = headers;
  }
}
