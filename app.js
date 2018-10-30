var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    expressSanitizer      = require("express-sanitizer"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

// --------------------- Require Routes ----------------------------------------

var GenRoutes            = require("./routes/General_routes.js"),
    AjaxRoutes            = require("./routes/Ajax_routes.js"),
    PhotoRoutes           = require("./routes/Photo_routes.js");

// ======================= Configuration =======================================
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost/tboxdatabase", { useNewUrlParser: true });
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use('/uploads',express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// ======================= Mongoose Models =====================================  
var Photo_Model         = require("./models/photo_m"),
    User                = require("./models/user_m"),
    RSSNews               = require("./public/javascripts/Rss_script");
    
// ======================= Passport Configuration =============================     
app.use(require("express-session")({
    secret: "Some Hae Meat and Canni Eat and Some Would Eat That Want It",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// ======================= Routes ==============================================
app.use("/", GenRoutes);
app.use("/Photos", PhotoRoutes);
app.use("/Ajax", AjaxRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Therapy Box Project Server Has Started!");
});