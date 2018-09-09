import {take,put,call} from 'redux-saga/effects'
import { request } from '../fetch/request'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as ArticleActionTypes} from '../reducers/articleReducer'
import { api } from '../fetch/api-config'

export function* getArticleList (tag,pageNum) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call([request,request.get], api.TEACHER_LIST);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticlesListFlow () {
    while (true){
        let req = yield take(ArticleActionTypes.GET_ARTICLE_LIST);
        console.log(req);
        let res = yield call(getArticleList,req.tag,req.pageNum);
        console.log(res);
        if(res){
            if(res.errorCode === 0){
                console.log(res.result);
                yield put({type: ArticleActionTypes.RESPONSE_ARTICLE_LIST,data:res.result});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export function* getArticleDetail (id) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(Request.get, `/getArticleDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* getArticleDetailFlow () {
    while (true){
        let req = yield take(ArticleActionTypes.GET_ARTICLE_DETAIL);
        let res = yield call(getArticleDetail,req.id);
        if(res){
            if(res.code === 0){
                yield put({type: ArticleActionTypes.RESPONSE_ARTICLE_DETAIL,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}