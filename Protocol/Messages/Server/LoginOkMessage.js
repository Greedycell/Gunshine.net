const PiranhaMessage = require('../../PiranhaMessage')

/**
 * LoginOkMessage (20104)
 * 
 * Client expects (class_159.decode):
 *   1. readLong() -> var_1593 (account ID)
 *   2. readString() -> var_1506 (token)
 *   3. readLong() -> var_1480 (home ID)
 *   4. readInt() -> array length (-1 = null, 0+ = player descriptors)
 *   5. readString() -> var_1638 (unknown, can be null)
 *   6. readInt() -> var_1788 (unknown)
 *   7. class_132.decode() -> var_1116 (settings):
 *      - readInt() -> var_1132 (setting type, default 1)
 *      - readBoolean() -> var_1062 
 *      - readBoolean() -> var_1190
 *      - readBoolean() -> var_1087
 *      - readBoolean() -> var_1204
 *      - readBoolean() -> var_1540
 *      - readInt() -> var_1471
 *   8. readInt() -> var_1331 (unknown)
 */
class LoginOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20104
    this.client = client
    this.version = 0
  }

  async encode () {
    // 1. Account ID (Long = 2 ints)
    this.writeLong(this.client.player.highID, this.client.player.lowID)
    
    // 2. Token (String)
    this.writeString(this.client.player.token)
    
    // 3. Home ID (Long = 2 ints)
    this.writeLong(this.client.player.highID, this.client.player.lowID)
    
    // 4. Player descriptors array (0 = empty array, not -1 which would be null and crash)
    // The client code does: if(_loc18_.length == 0) which crashes if null
    this.writeInt(0)
    
    // 5. Unknown string (null)
    this.writeString(null)
    
    // 6. Unknown int
    this.writeInt(0)
    
    // 7. class_132 settings object
    this.writeInt(1)           // var_1132 - setting type (1 = const_218)
    this.writeBoolean(true)    // var_1062
    this.writeBoolean(true)    // var_1190
    this.writeBoolean(true)    // var_1087
    this.writeBoolean(true)    // var_1204
    this.writeBoolean(false)   // var_1540
    this.writeInt(0)           // var_1471
    
    // 8. Unknown final int
    this.writeInt(0)
  }
}

module.exports = LoginOkMessage