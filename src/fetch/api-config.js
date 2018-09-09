import {PREFIX} from '../config/env';


export const api = {
  TEACHER_LIST: PREFIX + '/teacher/list', //导师/教授列表
};
/**
 * Simplify the rest parameters creation, e.g:
 * //NOTICE: order of params in array is important, params use object do not care about order
 * formatRestfulUrl('/user/:id/:id2', [1,2]) ->  /user/1/2
 * formatRestfulUrl('/user/:id/:id2', {id2: 2, id: 1}) ->  /user/1/2
 * @param {string} url request url definition
 * @param {Array|Object} params rest parameters
 * @return {*}
 */
export const formatRestfulUrl = function (url, params) {
  if (!params || url.indexOf(':') < 0) 
    return url;
  let parts = url.split('/');
  let partIndex = 0;
  const isArray = Array.isArray(params);
  parts.forEach(function (ele, index) {
    if (ele.indexOf(':') === 0) {
      parts[index] = isArray
        ? params[partIndex]
        : params[ele.substring(1)];
      partIndex++;
    }
  });
  return parts.join('/');
};

const restRegex = /\/:/g;

/**
 * Check the number of rest params in the current url definition
 * @param url
 * @return {number}
 */
export const numberOfRestParams = function (url) {
  const matched = url.match(restRegex);
  return matched
    ? matched.length
    : 0;
};