import Erros from './Erros'
import CPF from './cpf'

test('Deve formatar o CPF', () => {
  const teste = CPF.formatarcpf()
  expect(teste).toBe('000.000.000-00')
})

test('Deve desformatar o CPF', () => {
  const teste = CPF.desformatarcpf('612.438.926-68')
  expect(teste).toBe('61243892668')
})

test('deve calcular o DV', () => {
  const teste = CPF.calcularDV('612.438.92600')
  expect(teste).toBe('68')
})

test('deve ser invalido o CPF', () => {
  expect(() => CPF.validar('612.438.926-58')).toThrow(Erros.CPF_INVALIDO)
})

test('deve ser valido o CPF', () => {
  expect(() => CPF.validar('612.438.926-68')).toBeTruthy()
})

test('Deve retornar cpf invalido (false) para string vazia', () => {
  expect(CPF.isvalid('')).toBe(false)
})

test('Deve retornar cpf invalido (false) para string incompleta', () => {
  expect(CPF.isvalid('612')).toBe(false)
  expect(CPF.isvalid('6124')).toBe(false)
  expect(CPF.isvalid('61243')).toBe(false)
  expect(CPF.isvalid('612438')).toBe(false)
  expect(CPF.isvalid('61243892')).toBe(false)
  expect(CPF.isvalid('6124389266')).toBe(false)
  expect(CPF.isvalid('612.438.926-6')).toBe(false)
})
test('Deve retornar cpf invalido (false) para dv invalido', () => {
  expect(CPF.isvalid('612.438.926-58')).toBe(false)
})

test('Deve retornar cpf valido (true) para dv valido', () => {
  expect(CPF.isvalid('612.438.926-68')).toBe(true)
})
