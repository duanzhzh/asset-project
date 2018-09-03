/**
 * Created by summer on 2018/7/27.
 */
import qs from 'qs';
import URL from 'url-parse';
import isEmpty from 'lodash.isempty';
import 'whatwg-fetch';
import {toast} from 'react-toastify';
import {api, formatRestfulUrl, numberOfRestParams, prefix, imgUrl } from '../api/api-config';

const fetch = window.fetch;

const defaultOptions = {
    mode: 'cors',
    // credentials: 'include',
    // headers: {
    //     'Content-Type': 'application/json',
    //   },
};

const CODE = {
    SUCCESS: 0,
    FAIL: '999',
};

const toastOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 3000,
    closeButton: false,
    hideProgressBar: true,
};

class Request {

    constructor(options) {

        if (!(this instanceof Request)) {
            return new Request();
        }

        this.query = this.getQueryString();
        this.toastApi = !!this.query.toastapi;

        const ops = {...defaultOptions};
        if(!isEmpty(options) && !isEmpty(options.headers)) {
            ops.headers = Object.assign({}, ops.headers, options.headers);
            delete options.headers;
        }
        //set custom fetch options for the instance
        this.options = Object.assign({}, ops, options);
    }

    static get fetch() {
        return fetch;
    }

    static get api() {
        return api;
    }

    static get formatRestfulUrl() {
        return formatRestfulUrl;
    }

    jsonResponseHandler(data, apiOptions) {
        const ret = apiOptions.onlyData ? data.result : data;
        if (data.errorCode !== CODE.SUCCESS) {
            if(this.toastApi || apiOptions.toastApi) {
                toast(`API [${data.errorCode}] ${data.msg}`, toastOptions);
            }
            //if error, reject with the original response info
            return Promise.reject(data);
        }
        return Promise.resolve(ret);
    }

    sendRequest(url, options = {}) {
        if (!isEmpty(options.qs)) {
            url = this.addQueryString(url, options.qs);
        }

        url = this.normalizeRestfulParams(url, options);

        const apiOptions = Object.assign({}, this.options, options);
        return fetch(
            url,
            apiOptions,
            
        )
        .then(response => {
            if (!response.ok) {
                console.log(`[API-ERROR]-[${response.status}-[${new URL(response.url).pathname}]`);
                try {
                    return response.json().then((data) => {
                        return Promise.reject(data)
                    });
                } catch (e) {
                    return Promise.reject({msg: '网路连接异常'})
                }
            }
            return response.json()

        })
        .then(data => this.jsonResponseHandler(data, apiOptions), (err) => {
            return Promise.reject(err);
        });
    }

    addQueryString(url, params, baseUrl, noHost = false) {
        if (isEmpty(params)) return url;
        const obj = new URL(url, baseUrl || '');
        const addedQuery = ('string' === typeof params)
            ? params : qs.stringify(params);
        const query = obj.query ? `${obj.query}&${addedQuery}` : `?${addedQuery}`;
        const fullHost = obj.protocol ? `${obj.protocol}//${obj.host}` : '';
        return `${noHost ? '' : fullHost}${obj.pathname}${query}${obj.hash}`;
    }

  /**
   * 发起 get 请求
   * @param url {string}
   * @param params {object}
   * @param options {object}
   * @return {Promise}
   */
    get (url, params, options = {}) {
        if (!isEmpty(params)) {
            url = this.addQueryString(url, params);
        }
        return this.sendRequest(url, options);
    }

  /**
   * 发起 post 请求
   * @param url {string}
   * @param data {object}
   * @param options {object}
   * @return {Promise}
   */
    post(url, data = {}, options = {}) {
        const postOptions = Object.assign({
            method: 'POST',
            body: JSON.stringify(data)
        }, options);
        return this.sendRequest(url, postOptions);
    }

    put(url, data = {}, options = {}) {
        const putOptions = Object.assign({
            method: 'PUT',
            body: JSON.stringify(data)
        }, options);
        return this.sendRequest(url, putOptions);
    }

    delete(url, data = {}, options = {}) {
        const deleteOptions = Object.assign({
            method: 'DELETE',
            body: JSON.stringify(data)
        }, options);
        return this.sendRequest(url, deleteOptions);
    }

    upload(url, inputFiles, extraData, fileFieldName, options = {}) {
        const formData = new FormData();
        if (!isEmpty(extraData)) {
            const keys = Object.keys(extraData);
            for (const key of keys) {
                formData.append(key, extraData[key]);
            }
        }
        const fieldName = fileFieldName || 'files';
        let i = 0;
        for (; i < inputFiles.length; i++) {
            formData.append(fieldName, inputFiles[i]);
        }

        url = this.normalizeRestfulParams(url, options);

        const apiOptions = Object.assign({
            method: 'POST',
            body: formData,
            credentials: "same-origin",
        }, options);
        return fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => this.jsonResponseHandler(data, apiOptions))
            ;
    }

    getQueryString(url = window.location.href) {
        const obj = new URL(url, true);
        return obj.query;
    }

    genURL(url, parseQS = false) {
        return new URL(url, parseQS);
    }

    stripUrlHash(url) {
        const u = this.genURL(url);
        return `${u.origin}${u.pathname}${u.query}`;
    }

    normalizeRestfulParams (url, options) {
        const restLength = numberOfRestParams(url);
        const restParams = !isEmpty(options.restParams) ? options.restParams : [];
        if(restLength > 0) {
            if(restLength > restParams.length) {
                restParams.unshift(this.storeId || '0');
            }
            url = formatRestfulUrl(url, restParams);
        }
        return url;
    }

}

export {Request, api, prefix, imgUrl};
export default new Request();
