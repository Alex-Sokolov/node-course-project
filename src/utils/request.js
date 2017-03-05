// Функции по работе с запросом

/**
 * Обработка стартовой строки запроса
 * @param {string} string
 */
export const processStartString = function processStartString(string) {
  const [requestType, requestPath, httpVersion] = string.split(' ');

  return {
    requestType,
    requestPath,
    httpVersion,
  };
};

/**
 * Разделитель заголовков
 */
const HEADERS_DELIMITER = ': ';

/**
 * Обработка заголовков запроса
 * @param {array} headersArray
 */
export const processHeaders = function processHeaders(headersArray) {
  // Выпиливаем пустые строки в конце заголовков
  headersArray.splice(-2, 2);

  const headers = headersArray.reduce(
    (acc, item) => {
      const delimiter = item.search(HEADERS_DELIMITER);
      if (delimiter === -1) {
        throw new Error('В заголовке нет разделителя');
      }

      const key = item.substring(0, delimiter);
      const value = item.substring(delimiter + HEADERS_DELIMITER.length);

      // eslint-disable-next-line no-param-reassign
      acc[key] = value;

      return acc;
    },
    {},
  );

  return headers;
};
