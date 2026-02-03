class LogicAddPlayerCommand {
  constructor() {}

  async decode () {}

  async encode (self, data) {
    // LogicClientHome
    self.writeBoolean(true) // HasAvatar
    
    // AvatarData
    self.writeInt(data.characterDataId || 2097199)
    
    // SkillSystem
    self.writeInt(0) // skillbar 0
    self.writeInt(0) // skillbar 1
    self.writeInt(0) // skillbar 2
    self.writeInt(-1) // activeSkillBarIndex
    self.writeInt(0) // remainingGlobalCoolDown
    self.writeInt(0) // maxGlobalCoolDown
    self.writeInt(0) // cooldowncount
    
    // BuffSystem
    self.writeInt(0) // 0 buffs
    
    // MaterialBag
    self.writeInt(0)
    
    self.writeInt(100) // Money
    self.writeInt(0) // Diamonds
    
    // Ingredients (11 ingredient items)
    for (let i = 0; i < 11; i++) {
      self.writeInt(0)
    }
    
    self.writeInt(14) // EquipmentBag (PropCount)
    for (let i = 0; i < 14; i++) {
      self.writeInt(0) // empty
    }
    
    self.writeBoolean(true) // IsMeleeEquipped
    
    // RegularBag
    self.writeInt(20)
    for (let i = 0; i < 20; i++) {
      self.writeInt(0) // empty
    }
    
    // Attributes
    self.writeInt(1) // Level
    self.writeInt(100 << 10) // Health
    self.writeInt(100 << 10) // Energy
    self.writeInt(0) // Experience
    self.writeInt(0) // CurrentExperience
    self.writeInt(0) // SpecializationID
    self.writeInt(0) // SpecialRank
    self.writeInt(0) // SpecialExperience
    self.writeInt(0) // Flags
    
    // LogicClientAvatar
    self.writeLong(data.idHigh || 0, data.idLow || 1) // HighID, LowID
    self.writeString(data.name || "Player") // Name
    self.writeString(null) // FacebookID

    // TutorialBitList
    self.writeInt(0)
    self.writeInt(0)

    // Flags
    self.writeInt(0)

    self.writeBoolean(false) // DailyRewardCollected
    self.writeInt(0) // DailyRewardDay
    
    // MissionSystem
    self.writeInt(0) // 0 active missions

    // CompletedMissionsBitList
    for (let i = 0; i < 48; i++) {
      self.writeInt(0)
    }
    self.writeInt(0) // 0 daily mission cooldowns
    
    // VisitedLevelsBitList
    for (let i = 0; i < 7; i++) {
      self.writeInt(0)
    }
    
    // Achievements
    for (let i = 0; i < 2; i++) {
      self.writeInt(0)
    }
    
    // Specializations
    self.writeBoolean(false) // no specialization
    self.writeInt(0) // reSpecCount
    
    // KnownSkills
    self.writeInt(0) // 0 known skills
    
    // Party
    self.writeInt(0) // party members
    
    self.writeBoolean(false) // Mail Attachments
    self.writeBoolean(false) // MercenaryAvatar
    
    self.writeInt(0) // CraftingBotGlobalID
    
    // Achievements
    self.writeBoolean(false) // slot 0
    self.writeBoolean(false) // slot 1
    
    // Travel Types
    self.writeInt(0)
    self.writeInt(0)
    self.writeInt(0)
    
    self.writeInt(16777423) // HomeLevelGlobalID
    
    self.writeInt(Math.floor(Date.now() / 1000)) // Timestamp
    self.writeInt(Math.floor(Date.now() / 1000)) // // Timestamp

    self.writeInt(0) // Version
    

    self.writeInt(0)
  }
}

module.exports = LogicAddPlayerCommand