const PiranhaMessage = require('../../PiranhaMessage')
const CreatePlayerOkMessage = require('../Server/CreatePlayerOkMessage')
const CreatePlayerFailedMessage = require('../Server/CreatePlayerFailedMessage')

class CreatePlayerMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10200
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Name = this.readString()
    this.data.CharacterData = this.readString()

    console.log(this.data)
  }

  async process () {
    this.writeString('Astral') // Name
    this.writeInt(0) // CharacterData
    this.writeInt(0) // Unknown

    //await new CreatePlayerOkMessage(this.client).send()
    await new CreatePlayerFailedMessage(this.client).send()
  }
}

module.exports = CreatePlayerMessage