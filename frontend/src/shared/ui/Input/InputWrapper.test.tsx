import { renderWithForm } from "@/test-utils/renderWithForm"
import { screen } from '@testing-library/react'
import { InputWrapper } from "./InputWrapper"

describe('InputWrapper', () => {
  it('Рендерит label и дочерний элемент', () => {
    // given when
    renderWithForm(
      <InputWrapper label="Name" required={false} name="name">
        <input />
      </InputWrapper>
    )

    // then
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('Добавляет CSS когда required=true', () => {
    // given when
    const { container } = renderWithForm(
      <InputWrapper label="Имя" required={true} name="name">
        <input />
      </InputWrapper>
    )
    // then

    expect(container.querySelector('.input--required')).toBeInTheDocument()
  })
})