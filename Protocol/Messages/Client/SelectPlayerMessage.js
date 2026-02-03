const PiranhaMessage = require('../../PiranhaMessage')
const CurrentLevelMessage = require('../Server/CurrentLevelMessage')

/**
 * SelectPlayerMessage (10201)
 * 
 * Sent by client after receiving AvatarDataMessage (20203) to select
 * which avatar to play with and start the game.
 * 
 * Client class: package_42.class_126
 * 
 * The client sends this when:
 * 1. After character creation - intro plays, then sends 10201
 * 2. When selecting an existing character on the selection screen
 * 
 * Server must respond with CurrentLevelMessage (20407) to load the game level.
 */
class SelectPlayerMessage extends PiranhaMessage {
  constructor(bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10201
    this.version = 1
  }

  async decode() {
    this.data = {}
    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()
    
    this.client.log('Selected avatar ID:', this.data)
  }

  async process() {
    this.client.log('Sending CurrentLevelMessage (20407) to load the game')
    
    // Default: Northern Harbor (16777423)
    const homeLevel = this.client.player?.homeLevel || 16777423
    
    await new CurrentLevelMessage(this.client, {
      levelGlobalId: homeLevel,
      zoneType: 100,
      zoneContainer: 0,
      zoneData: homeLevel,
      zoneId: 0
    }).send()
  }
}

module.exports = SelectPlayerMessage