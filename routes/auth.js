const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Hash
const bcrypt = require('bcryptjs');
//token
const jwt = require('jsonwebtoken');
//Deklarasi Model
const User = require('../models/User/User_Model');
const UserRecordStat = require('../models/User/RecordStatus_Model')
const {registerValidation, loginValidation} = require('../validation');

router.post('/signup', async (req, res) => {


    //Validate input sebelum register
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(
        {
            message : error.details[0].message
        });
    //Check if user exist
    const userEmail = req.body.email.toLowerCase()
	const query = { email: userEmail };
    const emailExist = await User.findOne(query);

	if (emailExist) return res.status(400).send(
        {
            message : "Email already registered"
        });

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Create New User
    const newUser = new User({
        name: req.body.name,
        email: userEmail,
        password: hashPassword,
        number_of_Record: 0
    });

    try{
        await newUser.save()
        console.log(newUser._id);
        //bikin User record status
        try{
            const NewUserRecordStat = new UserRecordStat({
                id_pasien : newUser._id,
                recordStat : false
            });
            await NewUserRecordStat.save()
            console.log(NewUserRecordStat);

        }catch (err){
            res.status(400).send(err);
        }
        //kasih feedback successs
        res.status(200).send(
            {
                message : "Account by "+ newUser.email + " Created"
            });
        console.log('Registering user by :' + newUser.email)
    }catch (err){
        res.status(400).send(err);
    }

});


router.post('/login', async (req, res) => {
    //Validate input sebelum register
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(
        {
            message : error.details[0].message
        });
    
    //Check if user exist
    const userEmail = req.body.email.toLowerCase()
    const query = { email: userEmail };
    const user = await User.findOne(query);
    if (!user) return res.status(400).send(
        {
            message : 'Email doesnt exist'
        });

    //cek password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).send(
        {
            message :'Email or password is wrong'
        });

    const UserLogIn = {
        name : user.name,
        id_pasien : user._id
    }
    //generate token
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth token', token).send(token);
    res.status(200).send(UserLogIn);
    console.log(user._id + 'logging in');
});


module.exports = router;