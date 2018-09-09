import React, {Component} from 'react';
import {
  // BrowserRouter,
  Route,
  Switch,
  HashRouter as Router
} from 'react-router-dom';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as articleActions} from '../../reducers/articleReducer'
import './home.scss';
const {get_article_list} = articleActions;

class HomeA extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {articleList} = this.props;
    return (
      <div className="content">
        {articleList.map((item, index) => 
         <p key={index}>{item.cname}</p>
        )}
      </div>
    );
  }

  componentDidMount() {
    this
      .props
      .get_article_list(10, 1);
  }

}

function mapStateToProps(state) {
  return {articleList: state.article.articleList}
}

function mapDispatchToProps(dispatch) {
  return {
    get_article_list: bindActionCreators(get_article_list, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeA)
