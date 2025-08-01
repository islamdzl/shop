const mongoose = require('mongoose')
const logger = require('../services/Logger')

let isConnect = false;
let reconnectInterval = null;

const connect =async()=>{
  
  if (isConnect) return true;

  try{
    await mongoose.connect(process.env.DATABASE_URL, {});
  
    isConnect = true;
    logger.info({message: '✅ MongoDB connected successfully'});
    return true;
  }catch(err) {
    logger.error({message:'❌ MongoDB initial connection failed', error: err.message});
    return false;
  }
}

mongoose.connection.on('disconnected', ()=>{
  logger.warn({message: '⚠️ MongoDB connection lost'});

  isConnect = false;

  if (reconnectInterval) return;

  reconnectInterval = setInterval(async()=>{
    if (await connect()) {
      clearInterval(reconnectInterval)
      reconnectInterval = null;
    }
  }, 5000)
    
})

mongoose.connection.on('reconnected', ()=>{
  logger.info({message: '🔄 MongoDB reconnected'});
})

module.exports = connect
