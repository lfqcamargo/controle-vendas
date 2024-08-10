export class GroupAlreadyExistsError extends Error {
  constructor() {
    super('Group already exists.')
  }
}
