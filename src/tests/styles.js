import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'
import { map } from 'lodash'

import { withStyles } from '../styles'

test('withStyles', assert => {
  const DecoratedComponent = withStyles({
    style: {
      color: 'blue',
    },
  })(function DecoratedComponent(props) {
    const { classes } = props
    return $('p', { className: classes.style }, 'Blue')
  })

  const renderings = map([null, { classes: { other: 'style' } }], props =>
    render.create($(DecoratedComponent, props)),
  )

  assert.snapshot(renderings[0].toJSON(), 'renders without props')
  assert.snapshot(renderings[1].toJSON(), 'renders with props')

  const element = renderings[1].root.find(
    element => element.type === DecoratedComponent,
  )
  assert.is(element.props.classes.other, 'style', 'merges previous classes')

  for (let rendering of renderings) {
    rendering.unmount()
  }
})
