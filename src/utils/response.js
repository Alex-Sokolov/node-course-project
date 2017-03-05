import HttpStatus from 'http-status-codes';

/**
 * Генерация заголовка ответа
 * @param {number} code
 */
export function getStatusCode(code) {
  return `${code} ${HttpStatus.getStatusText(code)}`;
}

/**
 * Формирование ответа для браузера
 */
export default function generateResponse(code, data) {
  const response = [
    `HTTP/1.1 ${getStatusCode(code)}`,
    `Content-Length: ${data.length}`,
    '',
    data,
    '',
  ].join('\r\n');

  return response;
}
