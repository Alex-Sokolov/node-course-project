import HttpStatus from 'http-status-codes';

/**
 * Генерация заголовка ответа
 * @param {number} code
 */
export default function getStatusCode(code) {
  return `${code} ${HttpStatus.getStatusText(code)}`;
}
