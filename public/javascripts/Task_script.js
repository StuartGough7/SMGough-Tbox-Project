// Check Off Specific Todos By Clicking
$("ol").on("click", "input[type='checkbox']", function(){
	$(this).parent().toggleClass("completed");
});

//-----------------------------------------------------------------------------
//Click on X to delete Todo
$("ol").on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	var TaskID = $(this).parent().attr("id");
	$.ajax({url: "/Tasks/"+ TaskID +"?_method=DELETE",
		type: "Post",
		success: function(result){
			console.log("deleted");
		}
	});
	event.stopPropagation();
});
//-----------------------------------------------------------------------------

$("#toggle-form").click(function(){
	$("input[type='text']").fadeToggle();
	$(".btn-lg").fadeToggle();
});
