const path = require('path');
const {v4 : uuid} = require('uuid');
const {format} = require('date-fns');
const fs = require('fs');

const logEvents = async(message)=>{
  const dataTime = `${format(new Date(), "yyyy-MM-dd  HH:mm:ss")}`;
  const logItem = `\n ${dataTime}\t${uuid()}\t${message}`
  console.log(logItem);

  try{
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
      await fs.mkdirSync(path.join(__dirname, '..', 'logs'));
    }
    await fs.appendFileSync(
      path.join(__dirname,'..', 'logs', 'eventLog.txt'), logItem
      // ./logs/eventLog.txt
    )
  }catch(err){
    console.log(err);
  }
};

module.exports = {logEvents};