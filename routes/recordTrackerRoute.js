const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');

const recordTracker = require('../recordTracker')
    //get last (Number of save document) record number by ID pasien
    router.get('/Last/:ID', async (req,res) => {
        try{
            recordNum = await recordTracker.getNumberofRecord(req.query.userID);
            //console.log("HAI" + recordNum)
            res.json(recordNum); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET Record Number'});
        }
    });
    //Add record number by ID pasien
    router.get('/Update/:ID', async (req,res) => {
        try{
            recordNum = await recordTracker.updateNumberofRecord(req.query.userID);
            console.log("AKHIRNYA" + recordNum)
            res.json(recordNum); 
        }catch(err){
            console.log(err);
            res.json({message: 'err UPDATE Record Number'});
        }
    });
module.exports = router;