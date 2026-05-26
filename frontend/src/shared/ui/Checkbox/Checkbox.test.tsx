import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('Рендеринг чекбокса с пропсами', () => {
    // given when
    const onCheck = vi.fn()
    render(<Checkbox name="check" label="Подтвердить" onCheck={onCheck} />)

    // then
    expect(screen.getByText('Подтвердить')).toBeInTheDocument()
  })

  it('Клик по label вызывает onCheck', async () => {
    // given
    const onCheck = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox name="check" label="Подтвердить" onCheck={onCheck} />)

    // when
    await user.click(screen.getByText('Подтвердить'))

    // then
    expect(onCheck).toHaveBeenCalledTimes(1)
  })

  it('Клик по checkbox вызывает onCheck', async () => {
    // given
    const onCheck = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox name="check" label="Подтвердить" onCheck={onCheck} />)

    // when
    await user.click(screen.getByRole('checkbox'))

    // then
    expect(onCheck).toHaveBeenCalledTimes(1)
  })
})
