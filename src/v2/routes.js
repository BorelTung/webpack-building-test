import React from 'react'
import { render } from 'react-dom'
import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'

import App from 'components/App'

const createHistoryWithBasename = (historyOptions) => {
  return useBasename(createHistory)({
    basename: '/v2',
    ...historyOptions
  })
};

const reducer = combineReducers({
  router: routerStateReducer
});

export const store = compose(
  reduxReactRouter({
    createHistory: createHistoryWithBasename
  })
)(createStore)(reducer);

let loaderGif = require('public/loader.gif');
function createAsyncComponent(bundle) {
  return React.createClass({
    loadedComponent: null,

    componentDidMount: function () {
      setTimeout(this.load);
    },

    load: function () {
      if (this.constructor.loadedComponent) {
        return;
      }
      bundle(function (component) {
        this.constructor.loadedComponent = component;
        this.forceUpdate();
      }.bind(this));
    },

    preRender: function () {
      return (
        <div className="loader">
          <img src={loaderGif} alt="loading..." />
        </div>
      );
    },

    render: function () {
      var Component = this.constructor.loadedComponent;
      if (Component) {
        return (
          <div>
            <Component ref="realComponent" {...this.props}/>
          </div>
        );
      }
      return this.preRender();
    }
  });
}

function renderRoutes () {
  return (
    <ReduxRouter>
      <Route path="/" component={App}>
        <Route path="publish" component={createAsyncComponent(require('bundle?lazy!components/Publish'))}/>
        <Route path="*" component={createAsyncComponent(require('bundle?lazy!components/404'))}/>
      </Route>
    </ReduxRouter>
  );
}

@connect(({ state }) => ({}))
export default class AppRouter extends React.Component {
  render () {
    return renderRoutes();
  }
}
