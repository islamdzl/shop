require('dotenv').config()
const app = require('./app')
const connectDb = require('./config/connect_db');
const Logger = require('./services/Logger');

const PORT = process.env.PORT || 2007;

(async()=>{
  try {
    
    await connectDb()

    app.listen(PORT , ()=>{
      Logger.info({message: `Listening in port: ${PORT}`})
    })
  }catch(error) {
    Logger.error({message: `❌ Error in start application: ${error.message}`})
    process.exit(1)
  }
})(); 