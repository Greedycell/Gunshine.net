const PiranhaMessage = require('../../PiranhaMessage')
const AvatarDataMessage = require('../Server/AvatarDataMessage')

/**
 * AvatarReadyMessage (10504)
 * 
 * Sent by client after successfully loading the player avatar.
 * This is a notification message with no payload.
 * 
 * Client class: package_61.class_330
 * 
 * Server must respond with AvatarDataMessage (20203) to trigger
 * the game to actually load (calls method_1617 -> method_706).
 */
class AvatarReadyMessage extends PiranhaMessage {
  constructor(bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10504
    this.version = 0
  }

  async decode() {
    // No payload to decode - this message is empty
  }

  async process() {
    console.log('[AvatarReadyMessage] Client avatar loaded, sending AvatarDataMessage (20203) for:', this.client.player?.name || 'Unknown')
    
    // Get the player data that was stored during character creation
    // CharacterData globalID = (tableIndex << 20) | rowIndex
    // Table 2 (characters.csv) has player characters at rows 47-52:
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
      characterDataId: 2097199 // MalePlayerConstructionWorker (default fallback)
    }
    
    // Send AvatarDataMessage (20203) to trigger game loading
    // This message triggers method_1617() which calls method_706()
    // which then sends SelectPlayerMessage (10201) to start the game
    await new AvatarDataMessage(this.client, playerData).send()
  }
}

module.exports = AvatarReadyMessage
