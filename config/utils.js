/**
 * Created by summer on 2018/7/14.
 */
'use strict';

exports.getName = function getName(chunkName, ext, hashName, DEV_MODE) {
    return chunkName + (DEV_MODE ? '.' : '-[' + (hashName ? hashName : 'chunkhash') + ':9].') + ext;
};