/**
 * Кодировка по умолчанию
 */
export const ENCODING = 'utf-8';

/**
 * Конец строки
 */
export const LINE_ENDING = '\r\n';

/**
 * Пустая строка
 */
export const EMPTY_LINE = LINE_ENDING.repeat(2);

/**
 * Преобразование буфера в массив строк
 * @param {binary} buffer
 */
export function convertBufferToStringArray(buffer) {
  return buffer.toString(ENCODING).split(LINE_ENDING);
}
