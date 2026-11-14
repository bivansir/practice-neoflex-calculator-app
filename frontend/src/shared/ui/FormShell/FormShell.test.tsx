import { render, screen } from '@testing-library/react'
import { FormShell } from './FormShell'

describe('FormShell', () => {
  it('Рендерит дочерние элементы', () => {
    // given when
    render(
      <FormShell isPending={false}>
        <input placeholder="Имя" />
      </FormShell>
    )

    // then
    expect(screen.getByPlaceholderText('Имя')).toBeInTheDocument()
  })

  it('Рендерит ошибку если error переден', () => {
    // given when
    render(
      <FormShell isPending={false} error="Ошибка">
        <input />
      </FormShell>
    )

    // then
    expect(screen.getByText('Ошибка')).toBeInTheDocument()
  })

  it('Не рендерит ошибку если error не передан', () => {
    // given when
    render(
      <FormShell isPending={false}>
        <input />
      </FormShell>
    )

    // then
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('Рендерит Loader и блюрит контент когда isPending=true', () => {
    // given when
    const { container } = render(
      <FormShell isPending={true}>
        <input />
      </FormShell>
    )

    // then
    expect(screen.getByTestId('loader')).toBeInTheDocument()
    expect(container.querySelector('.form-shell__content--blurred')).toBeInTheDocument()
  })
})