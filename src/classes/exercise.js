export default class Exercise {
  constructor(ex) {
    this._id = ex._id
    this.name = ex.name
  }

  getName() {
    return this.name
  }

  getId() {
    return this._id
  }
}
