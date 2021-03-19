const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    index_Record :{
        type : Number
    },
    //_id : mongoose.Schema.Types.ObjectId,
    id_rompi : {
        type : String
    },
    // //id rompi no 1/2 etc
    id_sensor : {
        type : String
    },
    // //id sensor yang baca, make it easer tau mana yang mungkin broken
    id_pasien : {
        type : String
    },
    //id_pasien, bukan nama, kemungkinana ambil dari _id mongoose
    //accelerometer
    dataAccelerometer_X : { 
        type : [Number]
    },
    dataAccelerometer_Y : { 
        type : [Number]
    },
    dataAccelerometer_Z : { 
        type : [Number]
    },
    //suhu
     dataSuhu : { 
        type : [Number]
    },
    //ekg
    dataEKG : { 
        type : [Number]
    },
    //ppg
    dataPPG : { 
        type : [Number]
    },
    //emg
    dataEMG : { 
        type : [Number]
    },
    dataSPO2 : {
         type : Number
    },
    dataBPM : {
         type : Number
    }
}, {timestamps: true})


connData = mongoose.connection.useDb('DataSensor')

module.exports = connData.model('DataAllSensor', dataSchema);