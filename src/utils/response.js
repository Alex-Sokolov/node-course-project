/**
 * Генерация заголовка ответа
 * @param {number} code
 */
export function getStatusCode(code) {
  switch (code) {
    case 200:
      return '200 OK';
    case 404:
      return '404 Not Found';
    case 400:
    default:
      return '400 Bad Request';
  }
}

/**
 * Формирование ответа для браузера
 */
export default function generateResponse(code, data) {
  const response = [
    `HTTP/1.1 ${getStatusCode(code)}`,
    // `Content-type: image/png`,
    data,
    '',
  ].join('\r\n');

  return response;
}
