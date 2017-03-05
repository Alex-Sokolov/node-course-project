// Функции обработки буфера

/**
 * Кодировка по умолчанию
 */
const ENCODING = 'utf-8';

/**
 * Конец строки
 */
const LINE_ENDING = '\r\n';

/**
 * Определение окончание запроса
 * по пустой строке
 * @param {binary} data
 */
export const requestContainsEmptyLine = function requestContainsEmptyLine(data) {
  return data.toString(ENCODING).endsWith(LINE_ENDING.repeat(2));
};

/**
 * Преобразование буфера в массив строк
 * @param {binary} buffer
 */
export const processBuffer = function processBuffer(buffer) {
  return buffer.join('').toString(ENCODING).split(LINE_ENDING);
};
