var express     = require("express"),
    router      = express.Router(),
    path        = require("path"),
    fs          = require("fs"),
    passport    = require("passport");
    
const    multer      = require('multer');

var Photo_Model         = require("../models/photo_m"),
    User                = require("../models/user_m");

//==============================================================================    
//======================= Multer Setup =========================================
//==============================================================================

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, req.user.username + '-' + Date.now() +'-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


//==============================================================================    
    
// ------------------------ Get ------------------------------------------------

router.get("/",isLoggedIn, function(req, res){
   Photo_Model.find({}, function(err, photos){
       if(err){
           console.log("ERROR!");
       } else {
            var ownedPhotoss = [];
            photos.forEach(function(photo) {
                if(photo.owner.id.equals(req.user._id)) {
                    ownedPhotoss.push(photo);
                }
            });
          res.render("Photos_index", {photos: ownedPhotoss}); 
       }
   });
});

// ------------------------ New ------------------------------------------------

router.get("/new",isLoggedIn, function(req, res){
    res.render("Photos_new");
});

// ------------------------ Create ---------------------------------------------

      
router.post("/",isLoggedIn, upload.single('myImage') , function(req, res){
    
    req.body.photo.image = req.file.path;
    Photo_Model.create(req.body.photo, function(err, newPhoto){
        if(err){
            res.render("Photos_new");
        } else {
            
           newPhoto.owner.id = req.user._id;
           newPhoto.owner.username = req.user.username;
           newPhoto.save();
            res.redirect("/Photos");
        }
    });
});

// ------------------------- Show ----------------------------------------------

router.get("/:id",isLoggedIn, function(req, res){
   Photo_Model.findById(req.params.id, function(err, foundPhoto){
       if(err){
           res.redirect("/Photos");
       } else {
           res.render("Photos_show", {photo: foundPhoto});
       }
   })
});

// ------------------------- Edit ----------------------------------------------

router.get("/:id/edit",isLoggedIn, function(req, res){
    Photo_Model.findById(req.params.id, function(err, foundPhoto){
        if(err){
            res.redirect("/Photos");
        } else {
            res.render("Photos_edit", {photo: foundPhoto});
        }
    });
})
// ------------------------- Update --------------------------------------------

router.put("/:id",isLoggedIn, function(req, res){
    req.body.photo.body = req.sanitize(req.body.photo.body)
    Photo_Model.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
      if(err){
          res.redirect("/Photos");
      }  else {
          res.redirect("/Photos/" + req.params.id);
      }
   });
});

// ------------------------- Delete --------------------------------------------

router.delete("/:id",isLoggedIn, function(req, res){
    Photo_Model.findById(req.params.id,function(err, foundPhoto) {
      if(err){
          console.log(err);
      }  else {
            var filePath = foundPhoto.image;
            Photo_Model.findByIdAndRemove(req.params.id, function(err){
               if(err){
                   res.redirect("/Photos");
               } else {
                    
                    fs.unlinkSync(filePath);
                    res.redirect("/Photos");
               }
           })
      }
    });
});

//========================= Functions =========================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;