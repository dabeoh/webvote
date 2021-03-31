//Fonctions d'affichage a partir du menu
function toggleVote(){
	$("#userInfo").css("display", "block");
	$("#ballotCode").css("display", "block");
  $("#voteButton").css("display", "block");
  $("#accueil").css("display", "inline-block");

  //cacher boutons init
  $("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display",   "none");
}
    
function toggleCreate(){
  $("#userInfo").css("display", "block");
  $("#createButton").css("display", "inline-block");
  $("#accueil").css("display", "inline-block");

  //cacher boutons init
	$("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display",   "none");
}

function toggleManage(){
  //Affichage nouvelle page
  $("#userInfo").css("display", "block");
	$("#ballotCode").css("display", "block");
  $("#manageButton").css("display", "block");
  $("#accueil").css("display", "inline-block");

  //cacher boutons init
  $("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display",   "none");
}

//Creation d'un scrutin
function create(){
  let usermail = $("#usermail").val();
  let userpwd =  $("#userpwd").val();

}