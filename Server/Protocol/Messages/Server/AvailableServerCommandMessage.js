const PiranhaMessage = require('../../PiranhaMessage')
const LogicAddPlayerCommand = require('../../Commands/Server/LogicAddPlayerCommand.js')

class AvailableServerCommandMessage extends PiranhaMessage {
  constructor(client, playerData) {
    super()
    this.id = 20400
    this.client = client
    this.version = 0
    this.playerData = playerData || {}
    this.commands = []
  }

  async encode() {
    this.writeLong(0, 0)  // CurrentTick, SubTick
    this.writeInt(this.commands.length) // CommandCount
    
    // Encode each command
    for (const command of this.commands) {
      this.writeInt(command.type)

      var commands = {
        16: LogicAddPlayerCommand,
      }

      if (commands[command.type]) {
        this.client.log(`Gotcha ${command.type} command! `)
        
        await new commands[command.type]().encode(this, command.playerData)
        console.log(command.type)
      }
      else {
        this.client.log(`Gotcha undefined ${command.type} command!`)
      }
    }
  }
}

module.exports = AvailableServerCommandMessage