import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'

import { App } from '..'

test('app', assert => {
  const rendering = render.create($(App))
  assert.snapshot(rendering.toJSON(), 'renders')
  rendering.unmount()
})

test('counter', assert => {
  const rendering = render.create($(App))

  const { root } = rendering

  const buttons = root.findAll(element => element.type === 'button')
  assert.is(buttons.length, 3, 'has three buttons')
  const [reset, decrement, increment] = buttons

  const result = root.find(element => element.type === 'span')
  assert.is(result.children[0], '0', 'defaults to 0')

  increment.props.onClick()
  assert.is(result.children[0], '1', 'increments')

  decrement.props.onClick()
  assert.is(result.children[0], '0', 'decrements')

  decrement.props.onClick()
  assert.is(result.children[0], '-1', 'decrements')

  reset.props.onClick()
  assert.is(result.children[0], '0', 'resets')

  rendering.unmount()
})
