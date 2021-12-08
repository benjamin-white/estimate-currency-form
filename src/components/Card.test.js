import { render, screen } from '@testing-library/react'
import Card               from './Card'

describe('The Card component', () => {

  it('has a h1 title with the correct content', () => {

    render(<Card />)

    const titleText = 'IndiePledge'
    const titleTag  = screen.getByRole('heading', {name: titleText})

    expect(titleTag).toBeInTheDocument()
    expect(titleTag.nodeName).toBe('H1')

  })

})