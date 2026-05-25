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
    vi.resetAllMocks() // ← сбрасываем мок между тестами
  })

  it('рендерит children когда текущий шаг достаточен', () => {
    vi.mocked(useCurrentStep).mockReturnValue('secondStep' as FlowStep)
    renderGuard('firstStep' as FlowStep)

    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })

  it('редиректит когда текущий шаг недостаточен', () => {
    vi.mocked(useCurrentStep).mockReturnValue('firstStep' as FlowStep)
    renderGuard('secondStep' as FlowStep)

    expect(screen.getByText('404 page')).toBeInTheDocument()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('рендерит children когда текущий шаг равен minStep', () => {
    vi.mocked(useCurrentStep).mockReturnValue('secondStep' as FlowStep)
    renderGuard('secondStep' as FlowStep)

    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })
})