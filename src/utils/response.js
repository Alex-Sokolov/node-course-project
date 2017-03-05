import fs from 'fs';
import path from 'path';

const ENCODING = 'utf8';

/**
 * Формирование ответа для браузера
 */
export const generateResponse = function generateResponse(data) {
  const response = [
    'HTTP/1.1 200 OK',
    'Content-type: text/html; charset=utf-8',
    data.toString(ENCODING),
    '',
  ].join('\r\n');

  return response;
};

/**
 * Ответ клиенту файлом из каталога static
 * @param {string} requestPath
 */
export const responseWithFileAtPath = function responseWithFileAtPath(requestPath) {
  // TODO: использовать https://www.npmjs.com/package/fs-promise
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../../static', requestPath);

    fs.readFile(filePath, ENCODING, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};
