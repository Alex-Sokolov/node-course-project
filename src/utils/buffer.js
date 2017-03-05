/**
 * Кодировка по умолчанию
 */
const ENCODING = 'utf-8';

/**
 * Конец строки
 */
const LINE_ENDING = '\r\n';

/**
 * Пустая строка
 */
export const EMPTY_LINE = LINE_ENDING.repeat(2);

/**
 * Определение окончания запроса
 * по пустой строке
 * @param {binary} data
 */
export function requestContainsEmptyLine(data) {
  return data.toString(ENCODING).endsWith(EMPTY_LINE);
}

/**
 * Преобразование буфера в массив строк
 * @param {binary} buffer
 */
export function processBuffer(buffer) {
  return buffer.join('').toString(ENCODING).split(LINE_ENDING);
}
