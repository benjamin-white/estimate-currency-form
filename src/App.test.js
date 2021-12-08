import { render } from '@testing-library/react'
import App        from './App'

describe('The root App component', () => {

  it('should be a <main> tag', () => {

    const { container } = render(<App />)
    const expectedTag   = 'MAIN'

    expect(container.firstChild.nodeName).toBe(expectedTag)

  })

  it('should wrap content in a container class', () => {

    const { container }  = render(<App />)
    const containerClass = 'u-container'

    expect(container.firstChild).toHaveClass(containerClass)

  })

})
