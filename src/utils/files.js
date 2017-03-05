import fsp from 'fs-promise';
import path from 'path';

/**
 * Кодировка по умолчанию
 */
const ENCODING = 'utf8';

/**
 * Путь к каталогу со статикой
 */
const STATIC_FOLDER = path.join(__dirname, '../../static');

/**
 * Получение содержимого файла из каталога static
 * @param {string} fileName
 */
export default function getStaticFile(fileName) {
  const filePath = path.join(STATIC_FOLDER, fileName);
  return fsp.readFile(filePath, { encoding: ENCODING });
}
