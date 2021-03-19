const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const sensorDevice = require('../../models/SensorDevice/SensorDevice_Model');


//Post id_pasien dari app ke server
//tahap 1 paioring
router.post('/pair', async (req,res) => {
    try{
        console.log(req.body) //cek Body
        //Check if user exist
        const query = { 
            id_rompi: req.body.id_rompi,
            isPaired: false

        };
        const updateIDUser = {
            id_pasien: req.body.id_pasien,
            isPaired: true
        };
        const options = {upsert:false};

        // //update
        const devicesRompi = await sensorDevice.updateOne(query, updateIDUser, options);
        //balikin jumlah yang berhasil diupdate
        //1: berhasil keupdate si id_user sensor
        //0: antara gak ketemu atau lagi kepake
        console.log(devicesRompi.nModified);
        res.json(devicesRompi.nModified);
    }finally{
        //
    }
});

//fungsi pertama yang secara loop dipanggil sama sesnor
//sampe dapet pair, isapired : "true", dan ada id user
router.get('/pair/:ID', async (req,res) => {
    try{
        const query = {
            id_rompi: req.query.rompiID
        }
        const devicesRompi = await sensorDevice.findOne(query)
        const devicesPair ={
            isPaired : devicesRompi.isPaired,
            id_pasien : devicesRompi.id_pasien
        }
        res.json(devicesPair);
    }catch(err){
        console.log(err);
        res.json({message: 'err get Pair'});
    }
});

//ini fungsi untuk respon kalau sensor hdiup
//jadi kalau udah dapet apir, keluar loop dan ngeswitch status jadi true
router.get('/initialize/:ID', async (req,res) => {
    try{
        const query = {
            id_rompi: req.query.rompiID
        }
        const updateRompiStat = {
            statusRompi : true,
        };
        const options = {upsert:false};

        const devicesRompi = await sensorDevice.updateOne(query, updateRompiStat, options);
        //if 1 berarti berhais l baru go
        res.json(devicesRompi.n);
    }catch(err){
        console.log(err);
        res.json({message: 'err get Pair'});
    }
});

//APP: cek apakah si sensor ngaish respons
router.get('/readStat/:ID', async (req,res) => {
    try{
        const query = {
            id_rompi: req.query.rompiID
        }

        const devicesRompi = await sensorDevice.findOne(query);
        //kalau true baru beres dan siap record
        res.json(devicesRompi.statusRompi);
    }catch(err){
        console.log(err);
        res.json({message: 'err get Status Rompi'});
    }
});

//disconnect
router.get('/disconnect/:ID', async (req,res) => {
    try{
        const query= {
            id_rompi: req.query.rompiID,
            id_pasien: req.query.pasienID,
            recordStat : false
        }
        console.log(query)
        const resetRompiStat = {
            id_pasien : null,
            statusRompi : false,
            isPaired : false
        }
        const options = {upsert:false};
        //try{
        const devicesRompi = await sensorDevice.updateOne(query, resetRompiStat, options)
        //console.log(devicesRompi.n)
        if (devicesRompi.n == 1){
            res.status(200).send({
                message : "Disconnected with Rompi ID: " +  req.query.rompiID
            });
        }else{
            res.status(400).send({
                message : "Can't disconnect with device. Please try to stop recording first"
            });
        }
    }catch(err){
        console.log(err);
        res.json('err start Record');
    }
});



module.exports = router;