$( document ).ready(function() {
    TeamListGet();
});

//-----------------------------------------------------------------------------
// Check Off Specific Todos By Clicking
$(".TeamLibrary").on("click", "li", function(){
	var txt = $(this).text();
	$("input[type='text']").val(txt);
	$(".segway").text("Teams Beaten by "+ txt + " :");
	GetSportINfo(txt);
	
});

//-----------------------------------------------------------------------------

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		var txt = $(this).val();
		$(".segway").text("Teams Beaten by "+ txt + " :");
		GetSportINfo(txt);
	}
});

//============================================================================
function TeamListGet(){
	$.ajax({url: "/Ajax/Sport",
		type: "GET",
		success: function(result){
			result.forEach(function(team){
				$('.TeamLibrary').append('<li>'+team+'</li>');
			});
		}
	});
}

//-----------------------------------------------------------------------------

function GetSportINfo(teamname){
	$.ajax({url: "/Ajax/Sport/"+teamname,
		type: "GET",
		success: function(result){
			$('.bTeam').remove();
			result.forEach(function(beateam){
				$('.Teamsbeaten').append('<li class="bTeam">'+beateam+'</li>');
			});
		}
	});
}
