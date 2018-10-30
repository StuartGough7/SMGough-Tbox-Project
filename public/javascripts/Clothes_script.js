$( document ).ready(function() {
    Clothes();
});

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
            showInLegend: true
        }
    },
    series: [{
        name: 'Favourite Clothing Item',
        colorByPoint: true,
        data: values
    }]
});
}
    

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