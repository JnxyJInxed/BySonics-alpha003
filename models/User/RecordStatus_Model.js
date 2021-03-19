const mongoose = require("mongoose");

const userRecordStatSchema = mongoose.Schema({
    //_id : mongoose.Schema.Types.ObjectId,
    id_pasien : { 
        type : String
    },
    recordStat : { 
        type : Boolean
    }
})

UserRecordStatData = mongoose.connection.useDb('User')

module.exports = UserRecordStatData.model('UserRecordStat', userRecordStatSchema);