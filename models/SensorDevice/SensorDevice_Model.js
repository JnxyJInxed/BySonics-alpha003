const mongoose = require("mongoose");

const sensorDeviceSchema = mongoose.Schema({
	id_rompi : {
        type : String
    },
    // //id rompi no 1/2 etc
    id_pasien : {
        type : String
    },
    //apakah sensor on atau off. True=ON
    statusRompi : {
    	type : Boolean
    },
    //satus lagi pair apa engga smaa user
    isPaired : {
    	type : Boolean
    },
    recordStat : {
    	type : Boolean
    } 

})

sensorDeviceData = mongoose.connection.useDb('Sensor')

module.exports = sensorDeviceData.model('sensorDevice', sensorDeviceSchema);