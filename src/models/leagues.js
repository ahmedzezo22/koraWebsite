const mongoose = require('mongoose')
const News=require('./news')
const LeaguesSchema = new mongoose.Schema({
   name:{
       type:String,
       trim:true,
       required:true,
       unique:true
   },
   description:{
       type:String,
       trim:true,
       required:true
   },
   image:{
       type:String,
       default:"_"
   }
})
LeaguesSchema.virtual('News',{
    ref:'News', localField:'_id', foreignField:'ownerLeague'
})
const league=mongoose.model('leagues',LeaguesSchema)
module.exports=league