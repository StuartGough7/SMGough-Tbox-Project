$("#btnSubmit").click(function () {
    var pass1 = $("#Pass_word").val();
    var pass2 = $("#Conf_Pass_word").val();
    var ok = true;
    if (pass1 != pass2) {
        console.log("not same")
        $(".yelltext").css({display: "inline-block"});
        // document.getElementById("yelltext").style.display = "block";
    }else if($("#User_Name").val() == "" || $("#Email").val() == ""){
        $(".yelltext").css({display: "inline-block"});
    }
    else{
        $("#regform").submit();
    }
});