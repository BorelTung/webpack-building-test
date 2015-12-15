import React from 'react'

import Header from 'components/Header'
import 'styles/main.scss'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
}
