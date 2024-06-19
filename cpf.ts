import Erros from './Erros'

export default class CPF {
  constructor(cpf: string) {}

  static formatarcpf(cpf?: string): string {
    if (!cpf) cpf = '000000000-00'
    const regex = /(\d{3})[\.\s]?(\d{3})[\.\s]?(\d{3})[-\s]?(\d{2})/gm
    const cpfFormatado = cpf.replace(regex, '$1.$2.$3-$4')
    return cpfFormatado
  }

  static desformatarcpf(cpf?: string): string {
    if (!cpf) cpf = '000000000-00'
    const regex = /(\d{3})[\.\s]?(\d{3})[\.\s]?(\d{3})[-\s]?(\d{2})/gm
    const cpfFormatado = cpf.replace(regex, '$1$2$3$4')
    return cpfFormatado
  }

  static calculoalgarismo(digitos: string): number {
    var soma = 0
    var k = 10
    for (let i = 0; i < 9; i++) {
      soma = soma + parseInt(digitos[i]) * k
      k--
    }
    let DV = soma % 11
    let X = 11 - DV
    return X
  }

  static calcularDV(cpf?: string): string {
    if (!cpf) cpf = '000000000-00'
    cpf = this.desformatarcpf(cpf)
    let digitos = cpf.slice(0, 9)
    let operacao2 = cpf.slice(1, 9)
    let X = this.calculoalgarismo(digitos)

    let novosdigitos = operacao2 + X
    let Y = this.calculoalgarismo(novosdigitos)
    let novodv = X.toString() + Y.toString()
    return novodv
  }

  static validar(cpf?: string): boolean | undefined {
    if (!cpf) cpf = '000000000-00'
    cpf = this.formatarcpf(cpf)
    let dvcalculado = this.calcularDV(cpf)
    let digitoverificador = cpf.slice(12, 14).toString()
    if (dvcalculado !== digitoverificador) throw new Error(Erros.CPF_INVALIDO)
    if (dvcalculado === digitoverificador) return true
  }

  static isvalid(cpf: string): boolean {
    if (!cpf) return false
    const nums = cpf.replace(/\D/g, '').split('')
    if (nums.length !== 11) return false
    const dv1 = this.validarDV(nums.slice(0, 9), nums[9])
    const dv2 = this.validarDV(nums.slice(1, 10), nums[10])
    return dv1 && dv2
  }

  private static validarDV(digitos: string[], dvInformado: string): boolean {
    const fatores = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    const total = digitos.reduce((total, digito, i) => {
      return total + +digito * fatores[i]
    }, 0)
    const resto = total % 11
    const dvCalculado = resto < 2 ? 0 : 11 - resto
    return dvCalculado === +dvInformado
  }
}
