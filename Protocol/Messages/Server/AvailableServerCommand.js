const PiranhaMessage = require('../../PiranhaMessage')
const AddPlayerCommand = require('../../Commands/Server/AddPlayerCommand')

class AvailableServerCommand extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24111
    this.client = client
    this.version = 0
  }

  async encode () {
    var commands = {
      201: AddPlayerCommand,
    }

    if(this.commandID in commands){
      this.writeInt(this.commandID)
      await new commands[this.commandID]().encode(this, this.arg1)
      console.log(this.commandID)
    }
  }
}

module.exports = AvailableServerCommand