import { renderWithForm } from "@/test-utils/renderWithForm"
import { screen } from '@testing-library/react'
import { SelectInput } from "./SelectInput"

describe('SelectInput', () => {
  const options = [
    { value: '1', label: 'First' },
    { value: '2', label: 'Second' },
  ]

  it('Рендерит переданные опции', () => {
    // given when
    renderWithForm(
      <SelectInput name="options" label="Choose option" isRequired={false} options={options} />,
      { options: '' }
    )

    // then
    expect(screen.getByRole('option', { name: 'First' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Second' })).toBeInTheDocument()
  })

  it('Показывает placeholder как disabled опцию', () => {
    // given when
    renderWithForm(
      <SelectInput
        name="options" label="Choose option" isRequired={false}
        options={options} placeholder="placeholder"
      />,
      { options: '' }
    )

    // then
    const placeholder = screen.getByText('placeholder') as HTMLOptionElement
    expect(placeholder.disabled).toBe(true)
  })

  // 3. Disabled состояние
  it('блокирует select когда isDisabled=true', () => {
    // given when
    renderWithForm(
      <SelectInput name="options" label="Choose option" isRequired={false} options={options} isDisabled />,
      { options: '' }
    )

    // then
    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})