const PiranhaMessage = require('../../PiranhaMessage')
const CreatePlayerOkMessage = require('../Server/CreatePlayerOkMessage')
const CreatePlayerFailedMessage = require('../Server/CreatePlayerFailedMessage')

class CreatePlayerMessage extends PiranhaMessage {
  constructor(bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10200
    this.version = 1
  }

  async decode() {
    this.data = {}

    this.data.name = this.readString()
    this.data.characterDataId = this.readInt()
    this.data.propsCount = this.readInt()
    this.data.props = []
    for (let i = 0; i < this.data.propsCount; i++) {
      this.data.props.push(this.readInt())
    }

    //console.log(this.data)
  }

  async process() {
    const playerData = {
      idHigh: 0,
      idLow: this.client.accountId || 1,
      name: this.data.name,
      characterDataId: this.data.characterDataId,
      level: 1,
      maxHealth: 100,
      maxEnergy: 100,
      missionBitListSize: 8,
      visitedLevelsBitListSize: 8,
      secondBitListSize: 8,
      homeLevelId: 0,
      props: this.data.props
    }

    this.client.player = playerData

    this.client.log('Creating player:', playerData.name, 'CharacterData:', playerData.characterDataId)

    await new CreatePlayerOkMessage(this.client, playerData).send()
    //await new CreatePlayerFailedMessage(this.client).send()
  }
}

module.exports = CreatePlayerMessage
