import { render, screen } from '@testing-library/react'
import { EmailBanner } from './EmailBanner'

describe('EmailBanner', () => {
  it('Рендеринг баннера', () => {
    // given when
    render(<EmailBanner title='Title' instruction='Instructions'/>)

    // then
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Instructions')).toBeInTheDocument()
  })
})