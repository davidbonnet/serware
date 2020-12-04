import test from 'ava'

import { isChildPath } from '../isChildPath'

test('validates child path', async (assert) => {
  assert.true(isChildPath('/a', '/a'))
  assert.true(isChildPath('/a', '/a/'))
  assert.true(isChildPath('/a', '/a/b'))
})

test('rejects non-child path', async (assert) => {
  assert.false(isChildPath('/a', '/b'))
  assert.false(isChildPath('/a', '/'))
})
