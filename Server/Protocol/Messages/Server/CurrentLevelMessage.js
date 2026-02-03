const PiranhaMessage = require('../../PiranhaMessage')

/**
 * CurrentLevelMessage (20407)
 * 
 * Sent to client in response to SelectPlayerMessage (10201) to load the game level.
 * This message triggers the actual game loading.
 * 
 * Client class: package_57.class_182
 * 
 * Structure:
 * - int: Level globalID (e.g., 16777423 for Northern Harbor)
 * - ZoneId (class_190):
 *   - int type: Zone type (100+ = hub, 1 = mission, 2 = pvp)
 *   - int container: Container ID
 *   - int data: Level globalID
 *   - int id: Zone instance ID
 * 
 * When received, client calls:
 *   Account.method_10().method_735(level) - sets current level
 *   Account.getInstance().method_2601(zoneId) - sets zone ID
 *   class_26.getInstance().method_496(class_26.const_64) - loads the game!
 */
class CurrentLevelMessage extends PiranhaMessage {
  constructor(client, levelData) {
    super()
    this.id = 20407
    this.client = client
    this.version = 0
    this.levelData = levelData || {}
  }

  async encode() {
    // Level globalID
    // GlobalID = (tableIndex << 20) | rowIndex
    // Table 16 (levels.csv), row 207 = Northern Harbor (IsStartupLevel=TRUE)
    // globalID = (16 << 20) + 207 = 16777423
    const levelGlobalId = this.levelData.levelGlobalId || 16777423
    this.writeInt(levelGlobalId)
    
    // ZoneId (class_190)
    // For a hub level:
    //   type = 100 + hubIndex (100 = first hub)
    //   container = 0
    //   data = level globalID
    //   id = zone instance ID (0 for single player)
    const zoneType = this.levelData.zoneType || 100  // Hub type
    const zoneContainer = this.levelData.zoneContainer || 0
    const zoneData = this.levelData.zoneData || levelGlobalId
    const zoneId = this.levelData.zoneId || 0
    
    this.writeInt(zoneType)      // type
    this.writeInt(zoneContainer) // container
    this.writeInt(zoneData)      // data (level globalID)
    this.writeInt(zoneId)        // id
  }
}

module.exports = CurrentLevelMessage