const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId,
    index_Record :{
        type : Number
    },
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
    dataImage : { 
        type : String
    }
}, {timestamps: true})

connRekons = mongoose.connection.useDb('DataRekonstruksi')

module.exports = connRekons.model('DataImage', dataSchema);