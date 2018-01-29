/*Module Dependencies*/
var mysql = require('mysql'),
	express = require('express')
	app = express(); //create object of express module
	//http = require('http').createServer(app);
const env = require('env2')('./.git/info/.env');

/*App initialization*/
var connection = mysql.createConnection({
	host: process.env.DB_host,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_name
});

connection.connect((err) => {
	if(err) throw err;
	console.log('connected!');
});


/*Database setup*/
//could be used to check if database and table already exists and if not, create them
// connection.query('CREATE DATABASE IF NOT EXISTS workout_tracker', function(err){
// 	if(err) throw err;
// 	connection.query('USE workout_tracker', function(err){
// 		if(err) throw err;
// 		connection.query('CREATE TABLE IF NOT EXISTS workout('
// 			+ 'workoutID INT NOT NULL AUTO_INCREMENT,'
//             + 'PRIMARY KEY(userID),'
//             + 'name_first VARCHAR(30)'
//             + 'email VARCHAR(30)'
//             +  ')', function (err) {
//                 if (err) throw err;
//             });
// 	});
// });


/*Main route sends HTML file*/
app.get('/', (req, res)=>{
	res.sendFile(__dirname + '\\history.html')
});

app.get('/profile.html', (req, res)=>{
	res.sendFile(__dirname + '\\profile.html')
});

app.get('/history.html', (req, res)=>{
	res.sendFile(__dirname + '\\history.html')
});

app.use('/images',  express.static(__dirname + '/images'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/Semantic-UI-CSS-master',  express.static(__dirname + '/Semantic-UI-CSS-master'));
app.use('/styles',  express.static(__dirname + '/styles'));
app.use('/hist.js',  express.static(__dirname + '/hist.js'));
app.use('/profile.js',  express.static(__dirname + '/profile.js'));
app.use('/modernizr.custom.05819.js',  express.static(__dirname + '/modernizr.custom.05819.js'));

/*Update MySQL database*/
// app.post('/workout_tracker', (req,res)=>{
// 	connection.query('INSERT INTO workout_tracker SET ?', req.body,
// 		function (err, results) {
// 			if (err) throw err;
// 			res.send('Workout added to database with ID: ' + result.insertId);
// 		}
// 	);
// });

/*Begin listening*/
app.listen(3308);
console.log("Express server listening on port");