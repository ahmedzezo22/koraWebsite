const mongoose = require('mongoose')
const NewsSchema = new mongoose.Schema({
  
    title:{
        type:String,
        required: true,
        trim: true,
        // minlength:10,
        // maxLength:100
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    image:{
      type:String,
      default:"_"
    },
    OwnerLeague:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'leagues'
    }

},{timestamps:true})
const news=mongoose.model('news',NewsSchema)
module.exports=news
