var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    bab         = require("babel-polyfill"),
    RSSSParser     = require("../public/javascripts/Rss_script"),
    SportCSV     = require("../public/javascripts/SportCSV_script"),
    ClothData   = require("../public/Resources/Clothes.json");



router.get("/Clothes",isLoggedIn, function(req, res){
    var ClotheNumbersO = ClotheDataCompiler(ClothData);
    res.json(ClotheNumbersO);
});

router.get("/NewsRSS",isLoggedIn, function(req, res){
    var url = 'http://feeds.bbci.co.uk/news/rss.xml';
    var NewsRSSObjct; 
    RssObjGet(url, function(NewsRSSObjct){
        var RSSOb = new Object();
        RSSOb.Title = NewsRSSObjct.rss.channel[0].item[0].title[0];
        RSSOb.Descrp = NewsRSSObjct.rss.channel[0].item[0].description[0];
        RSSOb.link = NewsRSSObjct.rss.channel[0].item[0].link[0];
        RSSOb.image = NewsRSSObjct.rss.channel[0].item[0]["media:thumbnail"][0]["$"].url;
        res.send(RSSOb);
    });
});


router.get("/SportRSS",isLoggedIn, function(req, res){
    var url = 'http://feeds.bbci.co.uk/sport/football/rss.xml?edition=uk#';
    var SportRSSObjct; 
    RssObjGet(url, function(SportRSSObjct){
        var RSSOb = new Object();
        RSSOb.Title = SportRSSObjct.rss.channel[0].item[3].title[0];
        RSSOb.Descrp = SportRSSObjct.rss.channel[0].item[3].description[0];
        RSSOb.link = SportRSSObjct.rss.channel[0].item[3].link[0];
        res.send(RSSOb);
    });
});


router.get("/Sport",isLoggedIn, function(req, res){
    SportCSV.TeamlistonLoad(function(Teamlist){
        res.send(Teamlist);
    });
});


router.get("/Sport/:teamn",isLoggedIn, function(req, res){
    var Tname = req.params.teamn;
    SportCSV.Teamsbeatenby(Tname, function(Beatenteams){
        res.send(Beatenteams);
    });
});

//======================== Functions ==========================================



function ClotheDataCompiler(ClotheJsonFile){

    var counts = {};
    ClotheJsonFile.payload.forEach(function(arrobject) { 
        counts[arrobject.clothe] = (counts[arrobject.clothe] || 0)+1;
    });
    
    const ArrayCounts = Object.entries(counts);
    return(ArrayCounts);
}


function RssObjGet(url, fn){
    RSSSParser(url, function(err, data) {
        if (err) {
            return console.err(err);
        }
        fn(data); 
    });
}


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;