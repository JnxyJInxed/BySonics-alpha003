const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId,
    //jadinya dikasih kalau udah fiks aja
    // index_Record :{
    //     type : Number
    // },
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
    //accelerometer--Rekons
    dataAccelerometer_XReal : { 
        type : [Number]
    },
    dataAccelerometer_YReal : { 
        type : [Number]
    },
    dataAccelerometer_ZReal : { 
        type : [Number]
    },
    dataAccelerometer_XImag : { 
        type : [Number]
    },
    dataAccelerometer_YImag : { 
        type : [Number]
    },
    dataAccelerometer_ZImag : { 
        type : [Number]
    },
    //suhu
    dataSuhuReal : { 
        type : [Number]
    },
    dataSuhuImag : { 
        type : [Number]
    },
    //ekg
    dataEKGReal : { 
        type : [Number]
    },
    dataEKGImag : { 
        type : [Number]
    },
    //ppg
    dataPPGReal : { 
        type : [Number]
    },
    dataPPGImag : { 
        type : [Number]
    },
    //emg
    dataEMGReal : { 
        type : [Number]
    },
    dataEMGImag : { 
        type : [Number]
    },
     dataSPO2 : {
         type : Number
    },
    dataBPM : {
         type : Number
    }
}, {timestamps: true})

connRekons = mongoose.connection.useDb('DataRekonstruksi')

module.exports = connRekons.model('DataAllSensor', dataSchema);