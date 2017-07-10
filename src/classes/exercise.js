export default class Exercise {
  constructor(ex) {
    this._id = ex._id
    this.id = ex.id
    this.name = ex.name
  }

  getName() {
    return this.name
  }

  get_Id() {
    return this._id
  }

  getId() {
    return this.id
  }
}
