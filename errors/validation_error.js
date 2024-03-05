import CustomError from './custom_error.js'

class ValidationError extends CustomError {
  constructor ({ message, field, status = 403 }) {
    super(message)

    this.name = 'ValidationError'
    this.status = status
    this.field = field
  }

  toJson () {
    const obj = super.toJson()
    obj.error.field = this.field

    console.error(obj)
    return obj
  }
}

export default ValidationError
