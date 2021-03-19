//import package
var PORT = process.env.PORT || 3000;
//server
const express = require('express');
const app = express();
//database
const mongoose = require('mongoose');
//body parser
const bodyParser = require('body-parser');
//cors
const cors = require('cors');
//secret params
require('dotenv/config');

//MIDDLEWARE:
//cors: public access
app.use(cors());
//middleware body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


//import routes
const dataCameraRoute = require ('./routes/DataSensorRoute/dataImage')
const dataAllRoute = require ('./routes/DataSensorRoute/dataAllSensor')
//
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/dataImage', dataCameraRoute);
app.use('/dataAllSensor', dataAllRoute);

//route rekonstruk
//import routes
const rekonstruksiCameraRoute = require ('./routes/RekonstruksiRoute/dataImage')
const rekonstruksiAllRoute = require ('./routes/RekonstruksiRoute/dataAllSensor')

//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/rekonstruksiImage', rekonstruksiCameraRoute);
app.use('/rekonstruksiSensor', rekonstruksiAllRoute);

//Recording status
const recordingStatus = require('./routes/RecordingStatus')
app.use('/recording', recordingStatus);

//user authentication
//import routes
const userRoute = require ('./routes/auth');
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/user', userRoute);

//DEVICE
const deviceRoute = require ('./routes/SensorDeviceRoute/dataSensorDevice');
const pairRoute = require ('./routes/SensorDeviceRoute/pairSensorDevice');
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/sensor', deviceRoute, pairRoute);

//----------------------
const recordRoute = require('./routes/recordTrackerRoute');
app.use('/record', recordRoute);

//------------------------------------------------------
//ROUTE: neghubungin ke post dan get dkk
app.get('/', (req,res) => {
	res.send('BySonics Home Base Server');
});


//Connect to DB
mongoose.connect(
	process.env.DB_CONNECT_URL,  
	{useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connect to DB moongoose compass'),
);
// const dbBySonics = db.db('BySonics');
// const collectionUser = dbBySonics.collection(User);


//start LISTEN AT PORT:
app.listen(PORT, function () {
	console.log('Server running');
});

//reset param
const deviceReset = require('./deviceReset');
//deviceReset.resetRompiStat();

setInterval(function() { 
	deviceReset.resetRompiStat() //maggil funsgi ini setiap 
}, 600000);//this ms
