const express = require('express')
const router = express.Router()

router.use(express.json())

const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

router.post('/login', async (req,res) =>{
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
        res.status(404).send({message:'User not found'});
    }
    try {
        if(user.password == req.body.password){
            const payload = {email:user.email,password:user.password, role:user.role};
            const token = jwt.sign(payload,'employeeApp')
            res.status(200).send({message:'Login successful',token:token})
        }
        else{
            res.status(400).send({message:'Invalid credentials'})
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/adduser', async (req, res) =>{
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new userModel({
            email,
            password,
            role: 'Employee',
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to create' });
    }
})

module.exports = router;