'use strict'

class HealthCheckControler {
  static async check (_req, res) {
    try {
      const uptime = process.uptime()
      let hours = Math.floor(uptime / (60 * 60))
      hours = (hours < 10 ? '0' : '') + hours
      let minutes = Math.floor(uptime % (60 * 60) / 60)
      minutes = (minutes < 10 ? '0' : '') + minutes
      let seconds = Math.floor(uptime % 60)
      seconds = (seconds < 10 ? '0' : '') + seconds
      const uptimeString = `${hours}:${minutes}:${seconds}`

      const dateNow = new Date()

      const healthcheck = {
        uptime: uptimeString,
        message: 'OK',
        timestamp: dateNow.toLocaleString(),
        other: 'Esto con pm2'
      }
      return res.status(200).json(healthcheck);
    } catch (err) {
      console.log(err);
      return res.send(err.message);
    }
  }
}

module.exports = HealthCheckControler
