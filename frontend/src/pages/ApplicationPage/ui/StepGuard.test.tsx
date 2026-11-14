import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StepGuard } from './StepGuard'
import { useCurrentStep } from '@/entities/application/selectors'
import type { FlowStep } from '@/entities/application/types'

vi.mock('@/entities/application/selectors', () => ({
  useCurrentStep: vi.fn(),
}))

describe('StepGuard', () => {
  const renderGuard = (minStep: FlowStep) => {
    return render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <StepGuard minStep={minStep}>
                <div>Protected content</div>
              </StepGuard>
            }
          />
          <Route path="*" element={<div>404 page</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('Рендерит children когда текущий шаг валиден', () => {
    // given
    vi.mocked(useCurrentStep).mockReturnValue('secondStep' as FlowStep)

    // when
    renderGuard('firstStep' as FlowStep)

    // then
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('Редиректит когда текущий шаг недостаточен', () => {
    // given
    vi.mocked(useCurrentStep).mockReturnValue('firstStep' as FlowStep)

    // when
    renderGuard('secondStep' as FlowStep)

    // then
    expect(screen.getByText('404 page')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('Рендерит children когда текущий шаг равен minStep', () => {
    // given
    vi.mocked(useCurrentStep).mockReturnValue('secondStep' as FlowStep)

    // when
    renderGuard('secondStep' as FlowStep)

    // then
    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })
})