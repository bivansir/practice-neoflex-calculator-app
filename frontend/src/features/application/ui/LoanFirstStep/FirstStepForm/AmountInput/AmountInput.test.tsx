import { renderWithForm } from "@/test-utils/renderWithForm"
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AmountInput } from "./AmountInput"

describe('AmountInput', () => {
  const fmt = (val: number) => val.toLocaleString('ru-RU') + ' ₽'

  const defaultProps = {
    name: 'amount' as const,
    label: 'Amount',
    min: 1000,
    max: 100000,
  }

  it('Отображает отформатированное значение когда не в фокусе', () => {
    //given when
    renderWithForm(
      <AmountInput {...defaultProps} />,
      { amount: 50000 }
    )
    // then
    expect(screen.getByRole('textbox')).toHaveValue(fmt(50000))
  })

  it('Показывает чистое число при фокусе', async () => {
    // given
    const user = userEvent.setup()
    renderWithForm(
      <AmountInput {...defaultProps} />,
      { amount: 50000 }
    )

    // when
    await user.click(screen.getByRole('textbox'))

    // then
    expect(screen.getByRole('textbox')).toHaveValue('50000')
  })

  it('Игнорирует нечисловые символы при вводе', async () => {
    // given
    const user = userEvent.setup()
    renderWithForm(
      <AmountInput {...defaultProps} />,
      { amount: 0 }
    )

    // when
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '1abc23')

    // then
    expect(input).toHaveValue('123')
  })

  it('Ограничивает значение до max при блюре', async () => {
    // given
    const user = userEvent.setup()
    renderWithForm(
      <AmountInput {...defaultProps} />,
      { amount: 0 }
    )

    // when
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '999999')
    await user.tab()

    // then
    expect(input).toHaveValue(fmt(100000))
  })

  it('Ограничивает значение до min при блюре', async () => {
    // given
    const user = userEvent.setup()
    renderWithForm(
      <AmountInput {...defaultProps} />,
      { amount: 0 }
    )

    // when
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.type(input, '1')
    await user.tab()

    // then
    expect(input).toHaveValue(fmt(1000))
  })

  it('Подставляет min если поле пустое при блюре', async () => {
    // given
    const user = userEvent.setup()
    renderWithForm(
      <AmountInput {...defaultProps} />,
      { amount: 50000 }
    )

    // when
    const input = screen.getByRole('textbox')
    await user.click(input)
    await user.clear(input)
    await user.tab()

    // then
    expect(input).toHaveValue(fmt(1000))
  })
})
