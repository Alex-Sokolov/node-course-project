/**
 * Формирование ответа для браузера
 */
export default function generateResponse(data) {
  const response = [
    'HTTP/1.1 200 OK',
    // `Content-type: image/png`,
    data,
    '',
  ].join('\r\n');

  return response;
}
