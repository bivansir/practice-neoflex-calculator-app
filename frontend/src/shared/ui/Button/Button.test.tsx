import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('Рендеринг кнопки с именем', () => {
    // given when
    render(<Button name="Отправить" />)

    // then
    expect(screen.getByRole('button', { name: 'Отправить' })).toBeInTheDocument()
  })

  it('Вызывает onClick', async () => {
    //given
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button name="Отправить" onClick={handleClick} />)

    // when
    await user.click(screen.getByRole('button'))

    // then
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('Не вызывает onClick когда есть свойство disabled', async () => {
    // given
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button name="Отправить" onClick={handleClick} disabled />)

    // when
    await user.click(screen.getByRole('button'))

    // then
    expect(handleClick).not.toHaveBeenCalled()
  })
})



