$( document ).ready(function() {
    NewsRSS();   
});

//=============================================================================

function NewsRSS(){
    	$.ajax({url: "/Ajax/NewsRSS",
    		type: "GET",
    		success: function(result){
                $('#NewsTitle_L').text(result.Title); 
                $('#NewsDesc').text(result.Descrp);
                $('#NewsLink').attr("href", result.link);
                $('#Newsimage').attr("src", result.image);
	        }	
	    });
}