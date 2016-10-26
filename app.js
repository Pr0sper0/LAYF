var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");

var routes = require("./routes");
var setUpPassport = require("./setuppassport");

var app = express();

mongoose.connect("mongodb://localhost:27017/LAYF");
setUpPassport();

//app.set("port", process.env.PORT || 3000);

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var publicPath = path.resolve(__dirname, "imgs");
app.use("/public", express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({
	secret: "TRV0Js=HY#!F!Ww/4KiVs$s,<<MX",
	resave: true,
	saveUninitialized: true
}));

app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use(function(err, req, res, next){
	console.error(err);
	next(err);
});
/*
app.listen(app.get("port"), function(){
	console.log("Server started on port " + app.get("port"));
});
*/
