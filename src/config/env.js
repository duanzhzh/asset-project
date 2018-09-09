/**
 * API urls configuration
 */
let PREFIX = '';
/**
 * 获取图片的前缀
 */
let IMGURL = '';
switch (process.env.ENV) {
  case 'dev':
    // PREFIX = 'http://test.api.whartonehouse.com/api';
    // IMGURL = 'http://testbd.www.whartonehouse.com/uploads/';
    PREFIX = 'http://api.whartonehouse.com/api';
    IMGURL = 'http://admin.whartonehouse.com/uploads/';
    break;
  case 'build': //build
    PREFIX = 'http://api.whartonehouse.com/api';
    IMGURL = 'http://admin.whartonehouse.com/uploads/';
    break;
  case 'build_dev': //dev build
    PREFIX = 'http://test.api.whartonehouse.com/api';
    IMGURL = 'http://testbd.www.whartonehouse.com/uploads/';
    break;
  default:  //pre build 
    PREFIX = 'http://pre.api.whartonehouse.com/api';
    IMGURL = 'http://pre.admin.whartonehouse.com/uploads/';
}

export {PREFIX,IMGURL}