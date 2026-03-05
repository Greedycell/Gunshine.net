const PiranhaMessage = require('../../PiranhaMessage')

class LoginOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20104
    this.client = client
    this.version = 0
  }

  async encode () {
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeString(this.client.player.token) // Token
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeInt(0) // Array
    this.writeString(null) // Unknown
    this.writeInt(0) // Unknown

    this.writeInt(1) // Unknown
    this.writeBoolean(true) // Unknown
    this.writeBoolean(true) // Unknown
    this.writeBoolean(true) // Unknown
    this.writeBoolean(true) // Unknown
    this.writeBoolean(false) // Unknown
    this.writeInt(0) // Unknown

    this.writeInt(0)  // Unknown
  }
}

module.exports = LoginOkMessage