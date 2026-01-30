const PiranhaMessage = require('../../PiranhaMessage')

class CreatePlayerOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20201
    this.client = client
    this.version = 0
  }

  async encode () {
    if (this.client.player != null) {
      this.writeInt(this.client.player.length)
    }
  }
}

module.exports = CreatePlayerOkMessage