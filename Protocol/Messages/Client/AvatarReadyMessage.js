const PiranhaMessage = require('../../PiranhaMessage')
const AvatarDataMessage = require('../Server/AvatarDataMessage')

class AvatarReadyMessage extends PiranhaMessage {
  constructor(bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10504
    this.version = 0
  }

  async decode() {}

  async process() {
    this.client.log('Client avatar loaded, sending AvatarDataMessage (20203) for:', this.client.player?.name || 'Unknown')
    
    // 2097199 = MalePlayerConstructionWorker (Tank)
    // 2097200 = MalePlayerDoctor (Healer)
    // 2097201 = MalePlayerDeerHunter (Damage)
    // 2097202 = FemalePlayerMarine (Tank)
    // 2097203 = FemalePlayerDoctor (Healer)
    // 2097204 = FemalePlayerDeerHunter (Damage)
    const playerData = this.client.player || {
      idHigh: 0,
      idLow: 1,
      name: 'Player',
      characterDataId: 2097199 // Fallback
    }
    
    await new AvatarDataMessage(this.client, playerData).send()
  }
}

module.exports = AvatarReadyMessage