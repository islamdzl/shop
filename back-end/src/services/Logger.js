const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const path = require('path')
// التنسيق الخاص بالرسائل
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// إنشاء اللوجر
const Logger = createLogger({
  level: 'info', // المستوى الأدنى: info (يمكنك تغييره إلى debug أو warn)
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // ⬅️ Console
    new transports.Console({
      format: combine(
        colorize(), // ⬅️ يعطي ألوان حسب المستوى
        timestamp({ format: 'HH:mm:ss' }),
        logFormat
      )
    }),
    // ⬅️ ملفات
    new transports.File({ filename: path.join(__dirname, '../logs', 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs', 'combined.log') })
  ]
});

module.exports = Logger;
