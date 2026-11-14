// src/entities/application/store.test.ts
import { useApplicationStore } from './store'

beforeEach(() => {
  useApplicationStore.getState().reset()
})

describe('ApplicationStore', () => {
  it('Имеет правильный initial-state', () => {
    // given when
    const state = useApplicationStore.getState()

    // then
    expect(state.step).toBe('firstStep')
  })

  it('completeFirstStep устанавливает applicationId и переходит на secondStep', () => {
    // given when
    useApplicationStore.getState().completeFirstStep('test')

    // then
    const state = useApplicationStore.getState()
    expect(state.applicationId).toBe('test')
    expect(state.step).toBe('secondStep')
    expect(state.firstStepFormDraft).toBeNull()
    expect(state.secondStepFormDraft).toBeNull()
  })

  it('completeFlowStep переходит на следующий шаг', () => {
    // given
    const currentStep = 'firstStep'
    const nextStep = 'secondStep'

    // when
    useApplicationStore.getState().completeFlowStep(currentStep)

    // then
    expect(useApplicationStore.getState().step).toBe(nextStep)
  })

  it('completeFlowStep возвращает на первый шаг с последнего', () => {
    // given
    const lastStep = 'done'

    // when
    useApplicationStore.getState().completeFlowStep(lastStep)

    // then
    expect(useApplicationStore.getState().step).toBe('firstStep')
  })

  it('reset возвращает store в начальное состояние', () => {
    // given when
    useApplicationStore.getState().completeFirstStep('test')
    useApplicationStore.getState().reset()

    // then
    const state = useApplicationStore.getState()
    expect(state.step).toBe('firstStep')
    expect(state.applicationId).toBeNull()
  })
})