const ENCODING = 'utf8';

/**
 * Формирование ответа для браузера
 */
export default function generateResponse(data) {
  const response = [
    'HTTP/1.1 200 OK',
    `Content-type: text/html; charset=${ENCODING}`,
    data.toString(ENCODING),
    '',
  ].join('\r\n');

  return response;
}
