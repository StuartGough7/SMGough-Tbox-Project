var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    RSSNews     = require("../public/javascripts/Rss_script");

var Photo_Model         = require("../models/photo_m"),
    Task_Model          = require("../models/task_m"),
    User                = require("../models/user_m");
    
// ========================= Get ===============================================
router.get("/Login", function(req, res){
   res.render("Login"); 
});

router.get("/Register", function(req, res){
   res.render("Register"); 
});

router.get("/Logout", function(req, res){
   req.logout();
   res.redirect("/Login");
});


router.get("/Tasks",isLoggedIn, function(req, res){
    Task_Model.find({}, function(err, tasks){
       if(err){
           console.log("ERROR!");
       } else {
           var ownedTasks = [];
           tasks.forEach(function(task) {
                if(task.owner.id.equals(req.user._id)) {
                    ownedTasks.push(task);
                }
            });
          res.render("Tasks", {tasks: ownedTasks}); 
       }
   });
});


router.get("/Sport",isLoggedIn, function(req, res){
   res.render("Sport"); 
});

router.get("/Dashboard",isLoggedIn, function(req, res){
    Photo_Model.find({}, function(err, photos){
       if(err){
           console.log("ERROR!");
       } else {
            var ownedImages = [];
            photos.forEach(function(photo) {
            if(photo.owner.id.equals(req.user._id)) {
                ownedImages.push(photo);
            }
            });
            Task_Model.find({}, function(err, tasks){
                if(err){
                    console.log("ERROR!");
                } else {
                   var ownedTasks = [];
                   tasks.forEach(function(task) {
                        if(task.owner.id.equals(req.user._id)) {
                            ownedTasks.push(task);
                        }
                    });
                    res.render("Dashboard", {photos: ownedImages, tasks: ownedTasks}); 
                }
            })  
       }
   });
});

router.get("/Clothes",isLoggedIn, function(req, res){
   res.render("Clothes"); 
});

router.get("/News",isLoggedIn, function(req, res){
   res.render("News"); 
});



router.get("/", function(req, res){
   res.redirect("Login"); 
});

// ======================== Post ===============================================

router.post("/Register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("Register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/Dashboard"); 
        });
    });
});

router.post("/Login", passport.authenticate("local", 
    {
        successRedirect: "/Dashboard",
        failureRedirect: "/Login"
    }), function(req, res){
});


// ------------------------- Task Post ---------------------------------------

router.post("/Tasks",isLoggedIn, function(req, res){
    Task_Model.create(req.body.task, function(err, newTask){
        if(err){
            res.render("Tasks");
        } else {

           newTask.owner.id = req.user._id;
           newTask.owner.username = req.user.username;
           newTask.save();
            res.redirect("/Tasks");
        }
    });
});


// ------------------------- Task Delete ---------------------------------------

router.delete("/Tasks/:id",isLoggedIn, function(req, res){
   Task_Model.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/Tasks");
       } else {
           res.redirect("/Tasks");
       }
   })
});


// ------------------------ Middleware -----------------------------------------

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;