const PiranhaMessage = require('../../PiranhaMessage')

class LoginFailedMessage extends PiranhaMessage {
  constructor (client, errorCode) {
    super()
    this.id = 20103
    this.client = client
    this.version = 0
    this.errorCode = errorCode
  }

  async encode () {
    /*
    1 = ERROR_CODE_WRONG_PASSWORD,
    2 = ERROR_CODE_NO_SUCH_USER,
    3 = ERROR_CODE_ALREADY_LOGGED_IN,
    4 = ERROR_CODE_INVALID_SESSION_KEY,
    5 = ERROR_CODE_SESSION_EXPIRED
    */

    this.writeInt(this.errorCode)
  }
}

module.exports = LoginFailedMessage