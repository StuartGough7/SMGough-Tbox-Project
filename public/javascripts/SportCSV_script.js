const csvFilePath= "./public/Resources/I1.csv"
const csv=require('csvtojson')

//=============================================================================

function TeamlistonLoad(fctn){
    CSVparse(function(jsonObj){
        var Teamlist= [];
    
        for(let i = 0; i < jsonObj.length; i++){
            if(Teamlist.indexOf(jsonObj[i].HomeTeam) == -1){
                Teamlist.push(jsonObj[i].HomeTeam);
            }
        }
        fctn(Teamlist);
    });
}

//-----------------------------------------------------------------------------

function Teamsbeatenby(TeamName, fctn){
    CSVparse(function(jsonObj){
        var BeatenTeams= [];
        
        for(var i=0; i < jsonObj.length; i++){
            
            if(TeamName == jsonObj[i].HomeTeam){
                if(jsonObj[i].FTR == "H"){
                    BeatenTeams.push(jsonObj[i].AwayTeam);
                }
            }else if(TeamName == jsonObj[i].AwayTeam){
                if(jsonObj[i].FTR == "A"){
                    BeatenTeams.push(jsonObj[i].HomeTeam);
                }
            }
        }
        
        var BeatStripped= [];
        for(let i = 0; i < BeatenTeams.length; i++){
            if(BeatStripped.indexOf(BeatenTeams[i]) == -1){
                BeatStripped.push(BeatenTeams[i]);
            }
        }
        
        fctn(BeatStripped);
    });
}

//-----------------------------------------------------------------------------

function CSVparse(fctn){
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        fctn(jsonObj)
});  
}

//-----------------------------------------------------------------------------

module.exports = {
    TeamlistonLoad: TeamlistonLoad,
    Teamsbeatenby: Teamsbeatenby
}