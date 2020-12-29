const express=require('express')
const leagues=require('../models/leagues')
const   router= new express.Router()
// add league
router.post('/addLeague',async(req,res)=>{
    const league = new leagues(req.body)
    try{
        await league.save()
        res.send('added successfully')
    }
    catch(e) {res.send(e)}
})
// find one by id
router.get('/league/:id',async(req,res)=>{
    const _id=req.params.id
    const league= await leagues.findById(_id)
    try{
        if(!league){
            res.status(404).send({
                status:2,
                data:'',
                msg:'league not found'
            })
        }
       
        res.status(200).send({
            status:1,
            data:league,
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
//update league
router.patch('/editLeague/:id',async(req,res)=>{
    const _id=req.params.id
    const updates=req.body   
    const updatesKeys = Object.keys(req.body)
     try{
        const users=await leagues.findByIdAndUpdate(_id,updates,{
            new:true,
            runValidators:true 
        })
        res.status(200).send({
            status:1,
            data:users,
            msg:"league updated successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})


//delete league
router.delete('/deleteLeague/:id',async(req,res)=>{
    const _id=req.params.id
    const league=await leagues.findByIdAndDelete(_id)
     try{
        if(!league){
            res.status(404).send({
                status:2,
                data:'',
                msg:'No league found'
            })
        }
       
        res.status(200).send({
            status:1,
            msg:"league deleted successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})

//get all leagues
router.get('/allLeagues',async(req,res)=>{
    const league=await leagues.find({})
    try{
       if(!league){
           res.status(404).send({
               status:2,
               data:'',
               msg:'No league found'
           })
       }
      
       res.status(200).send({
           status:1,
           data:league,
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