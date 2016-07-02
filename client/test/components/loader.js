import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'

import Loader from '../../app/bundles/AnanasShop/components/Loader'

function setup() {
  let props = {}

  let renderer = TestUtils.createRenderer()
  renderer.render(<Loader {...props} />)
  let output = renderer.getRenderOutput()

  return { props, output, renderer }
}

describe('component', () => {
  describe('Loader', () => {
    it('should render correctly', () => {
      const { output } = setup()

      expect(output.type).toBe('div')
      expect(output.props.className).toBe('cssload-overlay')
    })
  })
})
