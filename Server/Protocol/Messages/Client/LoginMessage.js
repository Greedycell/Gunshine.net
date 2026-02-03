const PiranhaMessage = require('../../PiranhaMessage')
const LoginOkMessage = require('../Server/LoginOkMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')

class LoginMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10101
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Email = this.readString()
    this.data.PasswordHash = this.readString()

    console.log(this.data)
  }

  async process () {
    this.client.userObject = Object.assign({}, {
      Email: this.data.Email,
      PasswordHash: this.data.PasswordHash
    })
    this.client.mongoose.getPlayer(this.client, async (err, player) => {
      this.client.player = player
      await new LoginOkMessage(this.client).send()
    })
  }
}

module.exports = LoginMessage