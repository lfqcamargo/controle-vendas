export class GroupNotExistsError extends Error {
  constructor() {
    super('Group not exists.')
  }
}
