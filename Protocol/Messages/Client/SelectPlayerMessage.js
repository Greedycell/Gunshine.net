const PiranhaMessage = require('../../PiranhaMessage')

class SelectPlayerMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10201
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()

    console.log(this.data)
  }

  async process () {
    this.writeLong(this.data.HighID, this.data.LowID)
  }
}

module.exports = SelectPlayerMessage