import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import AppRouter, { store } from './routes'

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
, document.getElementById('app'));
