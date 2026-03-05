const PiranhaMessage = require('../../PiranhaMessage')

class StartLogicMessage extends PiranhaMessage {
  constructor(client) {
    super()
    this.id = 20405
    this.client = client
    this.version = 0
  }

  async encode() {
    const Time = new Date()
    
    // LogicGameCalendar
    this.writeInt(Time.getFullYear()) // Year
    this.writeInt(Time.getMonth() + 1) // Month
    this.writeInt(this.getWeekOfYear(Time)) // WeekOfYear
    this.writeInt(Time.getDate()) // DayOfMonth
    this.writeInt(Time.getHours()) // Hour
    this.writeInt(Time.getMinutes()) // Minute
    this.writeInt(this.getDayOfYear(Time)) // DayOfYear
    this.writeInt(Time.getMilliseconds()) // Milliseconds
  }

  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date - start
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  }

  getWeekOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 1)
    const diff = date - start
    const oneWeek = 1000 * 60 * 60 * 24 * 7
    return Math.floor(diff / oneWeek) + 1
  }
}

module.exports = StartLogicMessage