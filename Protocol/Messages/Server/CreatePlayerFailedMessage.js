const PiranhaMessage = require('../../PiranhaMessage')

class CreatePlayerFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20202
    this.client = client
    this.version = 0
  }

  async encode () {
    this.writeInt(0)
  }
}

module.exports = CreatePlayerFailedMessage