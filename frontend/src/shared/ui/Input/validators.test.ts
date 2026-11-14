import { validateAge, validateLength } from "./validators"


describe('validateAge', () => {
  it('Возвращает ошибку если возраст <= 18', () => {
    // given
    const birthDate = new Date()
    birthDate.setFullYear(birthDate.getFullYear() - 10)
    
    // when then
    expect(validateAge(birthDate.toISOString())).toBe('Age must be over 18')
  })

  it('Возвращает ошибку если возраст >= 70', () => {
    // given
    const birthDate = new Date()
    birthDate.setFullYear(birthDate.getFullYear() - 75)
    
    // when then
    expect(validateAge(birthDate.toISOString())).toBe('Age must be under 70')
  })

  it('Возвращает true для валидного возраста', () => {
    // given
    const birthDate = new Date()
    birthDate.setFullYear(birthDate.getFullYear() - 30)

    // when then
    expect(validateAge(birthDate.toISOString())).toBe(true)
  })
})

describe('validateLength', () => {
  it('Возвращает ошибку если длина не валидна', () => {
    // given
    const validate = validateLength(10)

    // when then
    expect(validate('short')).toBe('Must be 10 characters')
  })

  it('Возвращает true если длина валидна', () => {
    // given
    const validate = validateLength(4)

    // when then
    expect(validate('test')).toBe(true)
  })
})