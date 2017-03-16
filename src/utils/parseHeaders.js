// Функции по парсингу запроса

/**
 * Парсинг стартовой строки запроса
 * @param {string} string
 */
export const parseStartString = function parseStartString(startString) {
  const [method, url, httpVersion] = startString.split(' ');

  return {
    method,
    url,
    httpVersion,
  };
};

/**
 * Разделитель заголовков
 */
const HEADERS_DELIMITER = ': ';

/**
 * Парсинг заголовков запроса
 * @param {array} headersArray
 */
export const parseHeaders = function parseHeaders(headersArray) {
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
    {}
  );

  return headers;
};
