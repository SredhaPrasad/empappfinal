const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
router.use(express.json())
router.use(express.urlencoded({extended:true}))

function verifytoken(req,res,next){
    let token = req.headers.token;
    try {
        if(!token) throw 'Unauthorized acess';
        else{
            let payload = jwt.verify(token,'employeeApp');
            if(!payload) throw 'Unauthorized acess';
            next();
        }
    } catch (error) {
        console.log(error)
    }
}

const employeeModel = require('../model/employeeModel');

//Read
router.get('/',verifytoken,async (req,res) =>{
    try {
        const data = await employeeModel.find()
        res.send(data);
    } catch (error) {
        res.send("Failed to fetch data")
    }
})

//Create
router.post('/addemployee',verifytoken,async (req,res) =>{
    try {
        const data = new employeeModel(req.body);
        await data.save();
        res.send('Employee added successfully');
    } catch (error) {
        res.send("Failed to add data")
    }
})

//Update
router.put('/updateemployee/:id',verifytoken,async (req,res) =>{
    try {
        const updatedemployee = await employeeModel.findByIdAndUpdate(req.params.id,req.body);
        if(!updatedemployee){
            return res.send('Employee not found')
        }
        res.send("Employee updated successfully")
    } catch (error) {
        res.send('Failed to update employee')
    }
})

//Delete
router.delete('/deleteemployee/:id',verifytoken, async (req,res) =>{
    try {
        const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id)
        if(!deletedemployee){
            return res.send('Employee not found')
        }
        res.send('Employee deleted successfully')
    } catch (error) {
        res.send('Failed to delete employee')
    }
})

module.exports = router;