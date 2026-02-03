const PiranhaMessage = require('../../PiranhaMessage')

/**
 * CreatePlayerOkMessage (20201)
 * 
 * Sent to client after successful character creation.
 * Contains a complete class_76 player avatar.
 * 
 * HARDCODED VERSION for testing - encodes minimal player avatar
 */
class CreatePlayerOkMessage extends PiranhaMessage {
  constructor(client, playerData) {
    super()
    this.id = 20201
    this.client = client
    this.version = 0
    this.playerData = playerData || {}
  }

  async encode() {
    // LogicClientHome
    const playerData = this.playerData

    // 2097199 = MalePlayerConstructionWorker (Tank)
    // 2097200 = MalePlayerDoctor (Healer)
    // 2097201 = MalePlayerDeerHunter (Damage)
    // 2097202 = FemalePlayerMarine (Tank)
    // 2097203 = FemalePlayerDoctor (Healer)
    // 2097204 = FemalePlayerDeerHunter (Damage)
    this.writeInt(playerData.characterDataId || 2097199)
    
    this.writeInt(0) // skillbar 0
    this.writeInt(0) // skillbar 1
    this.writeInt(0) // skillbar 2
    this.writeInt(-1) // activeSkillBarIndex
    this.writeInt(0) // remainingGlobalCoolDown
    this.writeInt(0) // maxGlobalCoolDown
    this.writeInt(0) // cooldowns count
    
    // BuffSystem
    this.writeInt(0) // 0 buffs

    this.writeInt(0) // MaterialsBag
    
    this.writeInt(100) // Money
    
    this.writeInt(0) // Diamonds
    
    // Ingredients
    for (let i = 0; i < 11; i++) {
      this.writeInt(0)
    }
    
    // EquipmentBag
    this.writeInt(14)
    for (let i = 0; i < 14; i++) {
      this.writeInt(0) // empty
    }
    
    this.writeBoolean(true) // isMeleeEquipped
    
    // RegularBag
    this.writeInt(20)
    for (let i = 0; i < 20; i++) {
      this.writeInt(0) // empty
    }

    // Attributes
    this.writeInt(1) // Level
    this.writeInt(100 << 10) // Health
    this.writeInt(100 << 10) // Energy
    this.writeInt(0) // TotalExperience
    this.writeInt(0) // CurrentExperience
    this.writeInt(0) // SpecializationID
    this.writeInt(0) // SpecialRank
    this.writeInt(0) // SpecialExperience
    this.writeInt(0) // Flags
    
    // LogicClientAvatar
    this.writeLong(0, 1) // HighID, LowID
    
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
    for (let i = 0; i < 48; i++) {
      this.writeInt(0)
    }
    this.writeInt(0) // 0 DailyMissionCooldowns
    
    // VisitedLevelsBitList
    for (let i = 0; i < 7; i++) {
      this.writeInt(0)
    }
    
    // AchievementsBitList
    for (let i = 0; i < 2; i++) {
      this.writeInt(0)
    }
    
    // Specializations
    this.writeBoolean(false) // NoSpecialization
    this.writeInt(0) // reSpecCount
    
    // KnownSkills
    this.writeInt(0) // 0 known skills
    
    // Party
    this.writeInt(0) // 0 party members
    
    // MailAttachments
    this.writeBoolean(false) // null
    
    // MercenaryAvatar
    this.writeBoolean(false) // no mercenary
    
    // CraftingBotGlobalID
    this.writeInt(0)
    
    // Achievements
    this.writeBoolean(false) // slot 0
    this.writeBoolean(false) // slot 1
    
    // TravelType
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
    
    this.writeInt(16777423) // HomeLevelGlobalID
    
    this.writeInt(Math.floor(Date.now() / 1000)) // Timestamp
    this.writeInt(Math.floor(Date.now() / 1000)) // Timestamp
    
    this.writeInt(0) // Version
  }
}

module.exports = CreatePlayerOkMessage