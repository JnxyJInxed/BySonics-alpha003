const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const sensorDevice = require('./models/SensorDevice/SensorDevice_Model');

function resetRompiStat() {
   const query= {
        recordStat : false
    }
    const resetRompiStat = {
        id_pasien : null,
        statusRompi : false,
        isPaired : false
    }
    const options = {upsert:false};
    //try{
    sensorDevice.updateMany(query, resetRompiStat, options)
    .then(result => {
        const matchedCount = result.nModified;
        console.log('Reseting ' + matchedCount + ' device(s)');
    //const { matchedCount, modifiedCount } = result;
        //console.log(`Reset param`)
    //return result
    })
    .catch(err => console.error(`err reset Device`))
}

module.exports.resetRompiStat = resetRompiStat;