import { createElement as $ } from 'react'
import { render } from 'react-dom'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import { withStyles } from './styles'

export const App = compose(
  withStyles({
    '@global': {
      body: {
        font: {
          family: ['San Francisco', 'Arial', 'Helvetica'],
        },
        color: '#eeeeee',
        background: {
          color: '#1e1e1e',
        },
      },
      button: {
        margin: {
          right: 7,
        },
      },
    },
    success: {
      color: '#bce7a5',
      font: {
        weight: 'normal',
      },
    },
  }),
  withState('counter', 'setCounter', 0),
  withHandlers({
    increase: ({ setCounter }) => () => setCounter(x => x + 1),
    decrease: ({ setCounter }) => () => setCounter(x => x - 1),
    reset: ({ setCounter }) => () => setCounter(0),
  }),
)(function App(props) {
  const { classes, counter, increase, decrease, reset } = props
  return $(
    'div',
    null,
    $(
      'h1',
      null,
      'Foundation',
      ' ',
      $('small', { className: classes.success }, '(running)'),
    ),
    $(
      'p',
      null,
      'Counter: ',
      $('button', { onClick: reset }, 'Reset'),
      $('button', { onClick: decrease }, '-'),
      $('button', { onClick: increase }, '+'),
      $('span', null, counter),
    ),
  )
})

/* istanbul ignore next */
function start(App) {
  render($(App), global.document.getElementById('main'))
}

/* istanbul ignore next */
if (global.window) {
  start(App)
}

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept(function() {
    start(App)
  })
}
