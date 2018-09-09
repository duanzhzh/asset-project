import {fork} from 'redux-saga/effects'
import {getArticlesListFlow,getArticleDetailFlow} from './articleSaga'

export default function* rootSaga() {
    yield fork(getArticlesListFlow);
    yield fork(getArticleDetailFlow);
}
