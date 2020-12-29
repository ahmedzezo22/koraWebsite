const express=require('express')
const news=require('../models/news')
const   router= new express.Router()
// add news
router.post('/addNews',async(req,res)=>{
    const New = new news(req.body)
    try{
        await New.save()
        res.send('added successfully')
    }
    catch(e) {res.send(e)}
})


// find one by id
router.get('/news/:id',async(req,res)=>{
    const _id=req.params.id
    const New= await news.findById(_id)
    try{
        if(!New){
            res.status(404).send({
                status:2,
                data:'',
                msg:'news not found'
            })
        }
       
        res.status(200).send({
            status:1,
            data:New,
            msg:"data retrived successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})
//update News
router.patch('/editNews/:id',async(req,res)=>{
    const _id=req.params.id
    const updates=req.body   
     try{
        const New=await news.findByIdAndUpdate(_id,updates,{
            new:true,
            runValidators:true 
        })
        res.status(200).send({
            status:1,
            data:New,
            msg:"news updated successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})


//delete News
router.delete('/deleteNews/:id',async(req,res)=>{
    const _id=req.params.id
    const New=await news.findByIdAndDelete(_id)
     try{
        if(!New){
            res.status(404).send({
                status:2,
                data:'',
                msg:'No New found'
            })
        }
       
        res.status(200).send({
            status:1,
            msg:"News deleted successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})

//get all News
router.get('/allNews',async(req,res)=>{
    const New=await news.find({})
    try{
       if(!New){
           res.status(404).send({
               status:2,
               data:'',
               msg:'No news found'
           })
       }
      
       res.status(200).send({
           status:1,
           data:New,
           msg:"data retrived successfully"
       })
   }catch(e){
       res.status(400).send({
           status:0,
           data:e,
           msg:'error occure'
       })
   }
})

module.exports=router