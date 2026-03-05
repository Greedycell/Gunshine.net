const PiranhaMessage = require('../../PiranhaMessage')

/**
 * AvatarDataMessage (20203)
 * 
 * Sent to client to trigger the game loading after avatar is set.
 * Contains a complete class_76 player avatar.
 * 
 * Client class: package_42.class_166
 * 
 * This message triggers method_1617() which calls method_706() 
 * to actually load the player into the game.
 */
class AvatarDataMessage extends PiranhaMessage {
  constructor(client, playerData) {
    super()
    this.id = 20203
    this.client = client
    this.version = 0
    this.playerData = playerData || {}
  }

  async encode() {
    const playerData = this.playerData
    
    // LogicClientHome
    this.writeBoolean(true) // HasAvatar
    
    // AvatarData
    this.writeInt(playerData.characterDataId || 2097199)
    
    // SkillSystem
    this.writeInt(0) // skillbar 0
    this.writeInt(0) // skillbar 1
    this.writeInt(0) // skillbar 2
    this.writeInt(-1) // activeSkillBarIndex
    this.writeInt(0) // remainingGlobalCoolDown
    this.writeInt(0) // maxGlobalCoolDown
    this.writeInt(0) // cooldowncount
    
    // BuffSystem
    this.writeInt(0) // 0 buffs
    
    // MaterialBag
    this.writeInt(0)
    
    this.writeInt(100) // Money
    this.writeInt(0) // Diamonds
    
    // Ingredients (11 ingredient items)
    for (let i = 0; i < 11; i++) {
      this.writeInt(0)
    }
    
    this.writeInt(14) // EquipmentBag (PropCount)
    for (let i = 0; i < 14; i++) {
      this.writeInt(0) // empty
    }
    
    this.writeBoolean(true) // IsMeleeEquipped
    
    // RegularBag
    this.writeInt(20)
    for (let i = 0; i < 20; i++) {
      this.writeInt(0) // empty
    }
    
    // Attributes
    this.writeInt(1) // Level
    this.writeInt(100 << 10) // Health
    this.writeInt(100 << 10) // Energy
    this.writeInt(0) // Experience
    this.writeInt(0) // CurrentExperience
    this.writeInt(0) // SpecializationID
    this.writeInt(0) // SpecialRank
    this.writeInt(0) // SpecialExperience
    this.writeInt(0) // Flags
    
    // LogicClientAvatar
    this.writeLong(playerData.idHigh || 0, playerData.idLow || 1) // HighID, LowID
    this.writeString(playerData.name || "Player") // Name
    this.writeString(null) // FacebookID

    // TutorialBitList
    this.writeInt(0)
    this.writeInt(0)

    // Flags
    this.writeInt(0)

    this.writeBoolean(false) // DailyRewardCollected
    this.writeInt(0) // DailyRewardDay
    
    // MissionSystem
    this.writeInt(0) // 0 active missions

    // CompletedMissionsBitList
    for (let i = 0; i < 48; i++) {
      this.writeInt(0)
    }
    this.writeInt(0) // 0 daily mission cooldowns
    
    // VisitedLevelsBitList
    for (let i = 0; i < 7; i++) {
      this.writeInt(0)
    }
    
    // Achievements
    for (let i = 0; i < 2; i++) {
      this.writeInt(0)
    }
    
    // Specializations
    this.writeBoolean(false) // no specialization
    this.writeInt(0) // reSpecCount
    
    // KnownSkills
    this.writeInt(0) // 0 known skills
    
    // Party
    this.writeInt(0) // party members
    
    this.writeBoolean(false) // Mail Attachments
    this.writeBoolean(false) // MercenaryAvatar
    
    this.writeInt(0) // CraftingBotGlobalID
    
    // Achievements
    this.writeBoolean(false) // slot 0
    this.writeBoolean(false) // slot 1
    
    // Travel Types
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
    
    this.writeInt(16777423) // HomeLevelGlobalID
    
    this.writeInt(Math.floor(Date.now() / 1000)) // Timestamp
    this.writeInt(Math.floor(Date.now() / 1000)) // // Timestamp

    this.writeInt(0) // Version
  }
}

module.exports = AvatarDataMessage