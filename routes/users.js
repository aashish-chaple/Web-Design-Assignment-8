const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Get ALL
router.get('/getall', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({ message:err.message})
    }
})

//Create one
router.post('/create', async (req,res) => {
    const newUser = new User({
        full_name : req.body.full_name,
        email : req.body.email,
        password : req.body.password
    })
    try{
        const nu = await newUser.save()
        res.status(201).json(nu)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Update one
router.put('/edit', getUser, async (req,res) => {
    res.user[0].full_name = req.body.full_name
    res.user[0].password = req.body.password
    try{
        await res.user[0].save()
        res.status(201).json({message: "User Details updated successfully."})
    }catch(err){
        res.status(500).json({message:err.message})
    }
} )

//Delete one
router.delete('/delete', getUser, async (req,res) => {
    try{
        await User.deleteMany({email:req.body.email})
        // res.user[0].remove()
        res.status(201).json({message: "Successfully deleted user"})
    }catch(err){
        res.status(404).json({message : err.message})
    }
})

async function getUser(req,res, next){
    let user
    try{
        user = await User.find({email :req.body.email})
        console.log(req.body.email)
        if (user.length == 0){
            return res.status(404).json({message : "Cannot find the user"})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }
    
    res.user = user
    next()
}

module.exports = router