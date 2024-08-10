export class CPFCNPJAlreadyExistsError extends Error {
  constructor() {
    super('CPF/CNPJ already exists.')
  }
}
