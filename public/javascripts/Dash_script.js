$( document ).ready(function() {
    Weather();
    Clothes();
    NewsRSS();   
    SportRSS();
});

//=============================================================================
function Weather(){
    WeatherAPIGet(function(url){
    	$.ajax({url: url,
        	type: "GET",
        	success: function(result){
                var tempstring = result.main.temp + "°C"
                $('#Temp').text(tempstring);                                        //Adding to the page of id#
                $('#city').text(result.name); 
                $('#status').text(result.weather[0].description);
                
                if (result.weather[0].main == "Clear"){                             //For Image selection based on main status
                    $('#Wicons').attr('src',"../assets/Sun_icon.png");
                }else if (result.weather[0].main == "Cloudy"){
                    $('#Wicons').attr('src',"../assets/Clouds_icon.png")
                }else{
                    $('#Wicons').attr('src',"../assets/Rain_icon.png")
                }
                
        	}
        });
    });
}
//-----------------------------------------------------------------------------
function WeatherAPIGet(fctn) {
    var noGeolocation = function(){
        alert("No geolocation support");
    };
    if (!navigator.geolocation || !document.querySelector){
        noGeolocation();
    }
    else{
        navigator.geolocation.getCurrentPosition(
          function(position){
              var Latvar = position.coords.latitude;
              var Longvar = position.coords.longitude;
              var apiurl = "https://api.openweathermap.org/data/2.5/weather?lat="+ Latvar + "&lon=" +Longvar+"&units=metric&appid=d0a10211ea3d36b0a6423a104782130e"
              fctn(apiurl);
              }
        );
    }
}

//=============================================================================
function SportRSS(){
    	$.ajax({url: "/Ajax/SportRSS",
    		type: "GET",
    		success: function(result){
                $('#SportTitle').text(result.Title); 
                $('#SportDesc').text(result.Descrp);
	        }	
	    });
}

//=============================================================================
function NewsRSS(){
    	$.ajax({url: "/Ajax/NewsRSS",
    		type: "GET",
    		success: function(result){
                $('#NewsTitle').text(result.Title); 
                $('#NewsDesc').text(result.Descrp);
                $('#NewsLink').attr("href", result.link);
	        }	
	    });
}

//=============================================================================

function Clothes(){
	$.ajax({url: "/Ajax/Clothes",
		type: "GET",
		success: function(result){
			var total = 0;
			for(var i=0; i <result.length; i++){
		        total += result[i][1];
			}
    		var data = [{
                name: result[0][0],
                y: (result[0][1]/total)*100,
                sliced: true,
                selected: true
    		}];	
    		for(var i=1; i <result.length; i++){
    		    data[i] = {
                    name: result[i][0],
                    y: (result[i][1]/total)*100
    		    }
	        }	
		PieChartBuild(data);
		}
	});
}

//-----------------------------------------------------------------------------
function PieChartBuild(values){

    // Build the chart
var myChart = Highcharts.chart('ChartDiv', {
    chart: {
        backgroundColor:'rgba(255, 255, 255, 0.0)',
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: false
        }
    },
    series: [{
        name: 'Favourite Clothing Item',
        colorByPoint: true,
        data: values
    }]
});
}
    
//=============================================================================

$("ol").on("click", "input[type='checkbox']", function(){
	$(this).parent().toggleClass("completed");
});



//++++++++++++++++++ Tried and Failed on CORS and Access issues++++++++++++++++

// crossDomain: true,
// dataType: 'JSONP',
// jsonpCallback: 'callbackFnc',
// async: false,
// crossDomain: true,
// headers: {'Access-Control-Allow-Origin': '*'},

// var settings = {
//       'cache': false,
//       'dataType': "jsonp",
//       "async": true,
//       "crossDomain": true,
//       "url": "https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil",
//       "method": "GET",
//       "headers": {
//           "accept": "application/json",
//           "Access-Control-Allow-Origin":"*"
//       },
//       'xhrFields': {'cors': 'false'}
//   }
  
//   $.ajax(settings).done(function (response) {
//       console.log("Made it");

//   });
// $.ajax({url: "https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil",
//     type: "Get",
//     xhrFields: {cors: true},
//     crossDomain: true,
//     dataType: 'jsonp',
//     success: function() { alert("Success"); },
//     error: function() { alert('Failed!'); },
// });
    
// $.ajax({
//     type: "GET",
//     url: "https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil",
//     crossDomain: true,
//     dataType: 'jsonp',
//     }).done(function (data) {
//     console.log(data);
// });