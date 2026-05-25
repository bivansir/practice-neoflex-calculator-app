import userEvent from "@testing-library/user-event"
import { screen, render } from '@testing-library/react'
import { Tabs, type TabItem } from "./Tabs"

const mockItems: TabItem[] = [
  { id: 1, label: 'Tab 1', content: <p>Content 1</p> },
  { id: 2, label: 'Tab 2', content: <p>Content 2</p> },
  { id: 3, label: 'Tab 3', content: <p>Content 3</p> },
]

describe('Tabs', () => {
  it('Рендеринг по умолчанию без defaultActiveId', () => {
    // given when
    render(<Tabs items={mockItems} />)

    // then
    expect(screen.getByRole('button', { name: 'Tab 1' }))
      .toHaveClass('tabs__button--active')
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('Рендеринг с  defaultActiveId', () => {
    // given when
    render(<Tabs items={mockItems} defaultActiveId={3} />)

    // then
    expect(screen.getByRole('button', { name: 'Tab 3' }))
      .toHaveClass('tabs__button--active')
    expect(screen.getByText('Content 3')).toBeInTheDocument()
  })

  it('Переключение вкладки по клику', async () => {
    // given
    const user = userEvent.setup()
    render(<Tabs items={mockItems} />)

    // when
    await user.click(screen.getByRole('button', { name: 'Tab 2' }))

    // then
    expect(screen.getByRole('button', { name: 'Tab 2' }))
      .toHaveClass('tabs__button--active')
    expect(screen.getByRole('button', { name: 'Tab 1' }))
      .not.toHaveClass('tabs__button--active')
    expect(screen.getByRole('button', { name: 'Tab 3' }))
      .not.toHaveClass('tabs__button--active')

    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })
})