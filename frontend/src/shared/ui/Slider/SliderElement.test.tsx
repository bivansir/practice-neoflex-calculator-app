import { renderWithForm } from "@/test-utils/renderWithForm"
import userEvent from "@testing-library/user-event"
import { render, screen } from '@testing-library/react'
import { SliderElement } from "./SliderElement"
import { FormProvider, useForm } from "react-hook-form"

describe('SliderElement', () => {
  const defaultProps = {
    name: 'amount',
    title: 'Amount',
    min: 0,
    max: 100,
    step: 10,
  }

  it('Рендерит свой ui', () => {
    // given when
    renderWithForm(
      <SliderElement {...defaultProps} />,
      { amount: 50 }
    )

    // then
    expect(screen.getByText('Amount')).toBeInTheDocument()

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()

    expect(screen.getByText('50')).toBeInTheDocument()

    const input = screen.getByRole('slider')
    expect(input.style.background).toContain('#E2E8F0')
    expect(input.style.background).toContain('50%')
  })


  it('Обновляет значение вместе с формой', async () => {
    // given
    const Wrapper = () => {
      const methods = useForm({ defaultValues: { amount: 50 } })
      return (
        <FormProvider {...methods}>
          <SliderElement {...defaultProps} />
          <button onClick={() => methods.setValue('amount', 80)}>
            Change
          </button>
        </FormProvider>
      )
    }

    const user = userEvent.setup()
    render(<Wrapper />)

    // when
    await user.click(screen.getByText('Change'))

    // then
    expect(screen.getByRole('slider')).toHaveValue('80')
    expect(screen.getByText('80')).toBeInTheDocument()
  })
})