import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Accordion, type AccordionItem } from './Accordion'

const mockItems: AccordionItem[] = [
  { id: 1, title: 'First Question', description: 'First Answer' },
  { id: 2, title: 'Second Question', description: 'Second Answer' },
]

describe('Accordion', () => {
  it('Рендеринг элементов', () => {
    // given when
    render(<Accordion items={mockItems} />)

    // then
    expect(screen.getByText('First Question')).toBeInTheDocument()
    expect(screen.getByText('Second Question')).toBeInTheDocument()
    expect(screen.getByText('First Answer')).toBeInTheDocument()
    expect(screen.getByText('Second Answer')).toBeInTheDocument()
  })

  it('Открытие элемента по клику на title', async () => {
    // given
    const user = userEvent.setup()
    render(<Accordion items={mockItems} />)
    const items = document.querySelectorAll('details')
    expect(items[0]).not.toHaveAttribute('open')

    // when
    await user.click(screen.getByText('First Question'))

    // then
    expect(items[0]).toHaveAttribute('open')
    expect(screen.getByAltText('Свернуть')).toBeInTheDocument()
  })

  it('Открытие одного элемента закрывает другой', async () => {
    // given
    const user = userEvent.setup()
    render(<Accordion items={mockItems} />)
    const detailsElements = document.querySelectorAll('details')

    // when
    await user.click(screen.getByText('First Question'))
    expect(detailsElements[0]).toHaveAttribute('open')
    await user.click(screen.getByText('Second Question'))

    // then
    expect(detailsElements[0]).not.toHaveAttribute('open')
    expect(detailsElements[1]).toHaveAttribute('open')
  })
})