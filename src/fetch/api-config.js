import config from './config.json';

/**
 * Created by summer on 2018/7/12.
 */
/**
 * API urls configuration
 */
let prefix = '';
/**
 * 获取图片的前缀
 */
let imgUrl = '';
switch (process.env.ENV) {
  case 'dev':
    // prefix = 'http://test.api.whartonehouse.com/api';
    // imgUrl = 'http://testbd.www.whartonehouse.com/uploads/';
    prefix = 'http://api.whartonehouse.com/api';
    imgUrl = 'http://admin.whartonehouse.com/uploads/';
    break;
  case 'build': //build
    prefix = 'http://api.whartonehouse.com/api';
    imgUrl = 'http://admin.whartonehouse.com/uploads/';
    break;
  case 'build_dev': //dev build
    prefix = 'http://test.api.whartonehouse.com/api';
    imgUrl = 'http://testbd.www.whartonehouse.com/uploads/';
    break;
  default:  //pre build 
    prefix = 'http://pre.api.whartonehouse.com/api';
    imgUrl = 'http://pre.admin.whartonehouse.com/uploads/';
}

export const api = {
  TEACHER_LIST: prefix + '/teacher/list', //导师/教授列表
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

export {prefix, imgUrl}
