import { renderWithForm, renderWithFormSubmit } from "@/test-utils/renderWithForm"
import { screen } from '@testing-library/react'
import { DateInput, EmailInput, NumericInput, TextInput } from "./Input"
import userEvent from "@testing-library/user-event"

describe('TextInput', () => {
  it('Отображает label и placeholder', () => {
    // given when
    renderWithForm(
      <TextInput name="name" label="Your name" placeholder="Test" isRequired={false} />,
      { name: '' }
    )
    // then
    expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('Принимает только текст', async () => {
    // given
    const user = userEvent.setup()
    renderWithFormSubmit(
        <TextInput name="name" label="Your name" placeholder="Test" isRequired={true} />,
        {name: ''}
    )

    // when
    await user.type(screen.getByLabelText('Your name'), '12345')
    await user.click(screen.getByText('Submit'))

    // then
    expect(await screen.findByText('Invalid format')).toBeInTheDocument()
  })
})

describe('NumericInput', () => {
  it('Принимает только цифры', async () => {
    // given
    const user = userEvent.setup()
    renderWithFormSubmit(
        <NumericInput name="amount" label="Amount" placeholder="Test" isRequired={true} />,
        {amount: ''}
    )
    
    // when
    await user.type(screen.getByLabelText('Amount'), 'aaa')
    await user.click(screen.getByText('Submit'))

    // then
    expect(await screen.findByText('Invalid format')).toBeInTheDocument()
  })
})

describe('EmailInput', () => {
  it('Выдает ошибку при невалидном email', async () => {
    // given
    const user = userEvent.setup()
    renderWithFormSubmit(
      <EmailInput name="email" label="Email" placeholder="" isRequired={true} />,
      { email: '' }
    )

    // when
    await user.type(screen.getByLabelText('Email'), 'testmail.com')
    await user.click(screen.getByText('Submit'))

    // then
    expect(await screen.findByText('Invalid format')).toBeInTheDocument()
  })
})

describe('DateInput', () => {
  it('Рендерит поле с типом date', () => {
    // given when
    renderWithForm(
      <DateInput name="birthDate" label="Your Birthdate" placeholder="" isRequired={false} />,
      { birthDate: '' }
    )

    // then
    expect(screen.getByLabelText('Your Birthdate')).toHaveAttribute('type', 'date')
  })

  it('показывает ошибку при пустом обязательном поле', async () => {
    // given
    const user = userEvent.setup()
    renderWithFormSubmit(
      <DateInput name="birthDate" label="Дата рождения" placeholder="" isRequired={true} />,
      { birthDate: '' }
    )

    // when
    await user.click(screen.getByText('Submit'))

    // then
    expect(await screen.findByText('Дата рождения is required')).toBeInTheDocument()
  })
})