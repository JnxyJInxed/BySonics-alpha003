const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const sensorDevice = require('../../models/SensorDevice/SensorDevice_Model');

//Registrasi rompi
router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        console.log(req.body) //cek Body
        //Check if user exist
        const query = { id_rompi: req.body.id_rompi };
        const deviceExist = await sensorDevice.findOne(query);

        //cek kalau id rompi sama
        if (deviceExist) return res.status(400).send(
        {
            message : "Device(Rompi) already registered"
        });

        //kalau belum ada daftarin
        const newDevice = new sensorDevice({ //masukin info dari body ke salam model database Post
                    id_rompi : req.body.id_rompi,
                    id_pasien : null,
                    statusRompi : false,
                    isPaired : false,
                    recordStat : false
        });
        // Save and validate
        newDevice.save()
        .then(newDevice=> {
            return res.status(200).json({
            message :'Sensor device dengan ID: ' + newDevice.id_rompi +' berhasil terdaftar'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });
}); 

//Registrasi rompi


module.exports = router;