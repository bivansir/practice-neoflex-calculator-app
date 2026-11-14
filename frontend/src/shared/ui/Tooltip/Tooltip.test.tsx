import userEvent from "@testing-library/user-event"
import { screen, render } from '@testing-library/react'
import { Tooltip } from "./Tooltip"

describe('Tooltip', () => {
  it('Отображает переданный текст', () => {
    // given when
    render(
      <Tooltip text="Tooltip">
        <p>Text</p>
      </Tooltip>
    )

    // then
    expect(screen.getByText('Tooltip')).toBeInTheDocument()
  })
    
  it('Скрыт при рендере tooltip--visible по умолчанию', () => {
    // given when
    const { container } = render(
      <Tooltip text="Tooltip">
        <p>Text</p>
      </Tooltip>
    )

    // then
    expect(container.firstChild).not.toHaveClass('tooltip--visible')
  })

  it('Рендерит при onMouseEnter и скрывает при onMouseLeave', async () => {
    // given
    const user = userEvent.setup()
    const { container } = render(
      <Tooltip text="Tooltip">
        <p>Text</p>
      </Tooltip>
    )

    // when
    await user.hover(container.firstChild as Element)
    // then
    expect(container.firstChild).toHaveClass('tooltip--visible')

    // when
    await user.unhover(container.firstChild as Element)
    // then
    expect(container.firstChild).not.toHaveClass('tooltip--visible')
  })

  it('Рендерит тултип когда forceShow=true без onMouseEnter', () => {
    // given when
    const { container } = render(
      <Tooltip text="Tooltip" forceShow={true}>
        <p>Text</p>
      </Tooltip>
    )

    // then
    expect(container.firstChild).toHaveClass('tooltip--visible')
  })
})