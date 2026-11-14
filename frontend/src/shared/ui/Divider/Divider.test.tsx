import { render } from '@testing-library/react'
import { Divider, Orientation, BorderStyle } from './Divider'

describe('Divider', () => {
  it('Применяет горизонтальные стили', () => {
    // given when
    const { container } = render(
      <Divider orientation={Orientation.Horizontal} borderStyle={BorderStyle.Solid} />
    )
    const divider = container.firstChild as HTMLElement

    // then
    expect(divider).toHaveStyle({
      width: '100%',
      height: '0',
      borderBottom: '2px solid #80808033',
    })
  })

  it('Применяет вертикальные стили', () => {
    // given when
    const { container } = render(
      <Divider orientation={Orientation.Vertical} borderStyle={BorderStyle.Solid} />
    )
    const divider = container.firstChild as HTMLElement

    // then
    expect(divider).toHaveStyle({
      width: '0',
      height: '100%',
      borderLeft: '2px solid #80808033',
    })
  })

  it('Применяет вспомогательные пропсы', () => {
    // given when
    const { container } = render(
      <Divider
        orientation={Orientation.Horizontal}
        borderStyle={BorderStyle.Dashed}
        color="red"
        size="50%"
        thickness="4px"
      />
    )
    const divider = container.firstChild as HTMLElement

    // then
    expect(divider).toHaveStyle({
      borderBottom: '4px dashed rgb(255, 0, 0)',
      width: '50%'
    })
  })
})