const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataCamera = require('../../models/DataSensor/Camera_Model');
const recordTracker = require('../../recordTracker')

//DATA Camera_Model  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataCamera.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Camera'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataCamera_Last = await dataCamera.find().limit(1).sort({$natural:-1});
            res.json(dataCamera_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by Camera ID'});
        }
    });
    //get Last by ID
    router.get('/Lastest/:ID', async (req,res) => {
        try{
            const query = {
                id_pasien: req.query.pasienID
            }
            console.log(req.query.pasienID);
            const dataCamera_Last = await dataCamera.find(query).limit(1).sort({$natural:-1});
            res.json(dataCamera_Last);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by Camera ID'});
        }
    });

    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataCamera_All = await dataCamera.find(query);
            console.log(dataCamera_All);
            res.json(dataCamera_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Camera by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        //console.log(req.body) //cek Body
       //ADD RECORD
        const noRecord = await recordTracker.getNumberofRecord(req.body.id_pasien);
        console.log(noRecord);
        //
        const newData = new dataCamera({ //masukin info dari body ke salam model database Post
                     index_Record :noRecord,
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataImage : req.body.dataImage
        })
        // Save and validate
        console.log(newData)
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Data Camera Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;