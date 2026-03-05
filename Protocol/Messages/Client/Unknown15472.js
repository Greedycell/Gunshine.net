const PiranhaMessage = require('../../PiranhaMessage')

class Unknown15472 extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 15472
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Unknown = this.readLogicLong()

    console.log(this.data)
  }

  async process () {}
}

module.exports = Unknown15472