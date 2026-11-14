import { render, screen } from '@testing-library/react'
import { FormHeader } from './FormHeader'

describe('FormHeader', () => {
  it('Рендеринг хэдера формы', () => {
    // given when
    render(<FormHeader title='Title' step={1}/>)

    // then
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Step 1 of 5')).toBeInTheDocument()
  })
})