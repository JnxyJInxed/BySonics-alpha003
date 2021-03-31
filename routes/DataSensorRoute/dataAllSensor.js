const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataAllSensor = require('../../models/DataSensor/AllSensor_Model');
const recordTracker = require('../../recordTracker')

//DATA Accelerometer  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataAllSensor.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataAllSensor_Last = await dataAllSensor.find().limit(1).sort({$natural:-1});
            res.json(dataAllSensor_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by All ID'});
        }
    });

    //get Last by ID
   router.get('/Lastest/:ID', async (req,res) => {
        try{
            const query = {
                id_pasien: req.query.pasienID
            }
            console.log(req.query.pasienID);
            const dataAllSensor_Last = await dataAllSensor.find(query).limit(1).sort({$natural:-1});
            res.json(dataAllSensor_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by All Sensor ID'});
        }
    });
    //get LAST RECORD by ID
    router.get('/Record/:ID', async (req,res) => {
        try{
            console.log(req.query.pasienID);
            console.log(req.query.recordIndex);
            const query = {
                index_Record : req.query.recordIndex,
                id_pasien: req.query.pasienID
            }
            //console.log(req.body.id_pasien);
            const dataAllSensor_All = await dataAllSensor.find(query);
            console.log(dataAllSensor_All);
            res.json(dataAllSensor_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor by ID'});
        }
    });

    
    router.get('/LastRecord/:ID', async (req,res) => {
        try{
            console.log(req.query.pasienID);
            noRecord = await recordTracker.getNumberofRecord(req.query.pasienID);
            const query = {
                index_Record : noRecord,
                id_pasien: req.query.pasienID
            }
            //console.log(req.body.id_pasien);
            const dataAllSensor_All = await dataAllSensor.find(query);
            console.log(dataAllSensor_All);
            res.json(dataAllSensor_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor by ID'});
        }
    });
    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataAllSensor_All = await dataAllSensor.find(query);
            console.log(dataAllSensor_All);
            res.json(dataAllSensor_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        //ADD RECORD
        console.log("SAVE REKONS " + req.body);
        const noRecord = await recordTracker.getNumberofRecord(req.body.id_pasien);
        console.log(noRecord);
        //
        const newData = new dataAllSensor({ //masukin info dari body ke salam model database Post
                    index_Record :noRecord,
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataAccelerometer_X : req.body.dataAccelerometer_X,
                    dataAccelerometer_Y : req.body.dataAccelerometer_Y,
                    dataAccelerometer_Z : req.body.dataAccelerometer_Z,
                    //suhu
                    dataSuhu : req.body.dataSuhu,
                    //ekg
                    dataEKG : req.body.dataEKG, 
                    //ppg
                    dataPPG : req.body.dataPPG, 
                    //emg
                    dataEMG : req.body.dataEMG, 
                    
                    dataSPO2 : req.body.dataSPO2,
                    dataBPM : req.body.dataBPM
        });
        console.log(newData)
        // Save and validate
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Data All Sensor Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;