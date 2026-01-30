const PiranhaMessage = require('../../PiranhaMessage')

class Unknown20205 extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20205
    this.client = client
    this.version = 0
  }

  async encode () {
    this.writeLong(0, 1) // HighID, LowID
    this.writeString('Astral') // Name
    this.writeString(null) // Unknown
    this.writeString(null) // Unknown
    this.writeInt(0) // Unknown
    this.writeInt(0) // Unknown
  }
}

module.exports = Unknown20205