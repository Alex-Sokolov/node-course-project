import fs from 'fs';
import path from 'path';

/**
 * Ответ клиенту файлом из каталога static
 * @param {string} requestPath
 */
export const responseWithFileAtPath = function responseWithFileAtPath(requestPath) {
  const filePath = path.join(__dirname, '../../static', requestPath);

  console.log(`Filepath is ${requestPath}`);
  console.log(`Resolved path is ${filePath}`);

  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      throw error;
    }

    console.log(data);
  });
};

/**
 * Формирование ответа для браузера
 */
export const generateResponse = function generateResponse() {
  return '';
};
