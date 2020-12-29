const express=require('express')
const auth = require('../middleware/auth')
const User=require('../models/users')
const   router= new express.Router()
router.post('/user/register', async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.send('added successfully')
    }
    catch(e) {res.send(e)}
})
// get user by id
router.get('/user/:id',async(req,res)=>{
    const _id=req.params.id
    const users= await User.findById(_id)
    try{
        if(!users){
            res.status(404).send({
                status:2,
                data:'',
                msg:'user not found'
            })
        }
       
        res.status(200).send({
            status:1,
            data:users,
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
//update user
router.patch('/editUser/:id',async(req,res)=>{
    const _id=req.params.id
    const updates=req.body   
    const updatesKeys = Object.keys(req.body)
    const allowedUpdates = ["userName","phone","email","image"]
    const validUpdates = updatesKeys.every((u)=>allowedUpdates.includes(u))
    if(!validUpdates)
        res.status(400).send({
            status:4,
            data:'',
            msg:'invalid updates'
        })
     try{
        const users=await User.findByIdAndUpdate(_id,updates,{
            new:true,
            runValidators:true 
        })
        res.status(200).send({
            status:1,
            data:users,
            msg:"user updated successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})


//delete user
router.delete('/deleteUser/:id',async(req,res)=>{
    const _id=req.params.id
    const users=await User.findByIdAndDelete(_id)
     try{
        if(!users){
            res.status(404).send({
                status:2,
                data:'',
                msg:'No user found'
            })
        }
       
        res.status(200).send({
            status:1,
            msg:"user deleted successfully"
        })
    }catch(e){
        res.status(400).send({
            status:0,
            data:e,
            msg:'error occure'
        })
    }
})

//get all users
router.get('/allUsers',async(req,res)=>{
    const users=await User.find({})
    try{
       if(!users){
           res.status(404).send({
               status:2,
               data:'',
               msg:'No users'
           })
       }
      
       res.status(200).send({
           status:1,
           data:users,
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
//login
router.post('/login' ,async(req,res)=>{
    
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        console.log(user.userName)
        const token = await user.generateToken()
        res.send({
            status:1,
            data:user,
            msg:"logged in",
            token: token
        })
    }
    catch(e){
        res.status(500).send({
            status:0,
            data:e,
            msg:"err in data",
            token:""
        })
    }
})

module.exports = router
