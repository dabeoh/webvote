//Fonctions d'affichage a partir du menu
function toggleVote(){
	$("#userInfo").css("display", "block");
	$("#ballotCode").css("display", "block");
  $("#voteButton").css("display", "block");
  $("#accueil").css("display", "inline-block");
  $("#authconfirm").css("display", "inline-block");

  //cacher boutons init
  $("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display",   "none");
}
    
function toggleCreate(){
  $("#userInfo").css("display", "block");
  $("#createButton").css("display", "inline-block");
  $("#accueil").css("display", "inline-block");
  $("#authconfirm").css("display", "inline-block");
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
  $("#authconfirm").css("display", "inline-block");

  //cacher boutons init
  $("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display",   "none");
}

//Creation d'un scrutin
function create(){
  let usermail = $("#usermail").val();
  let userpwd =  $("#userpwd").val();

  $.ajax({
    method: "GET",
    url: "auth.php",
    data: { "usermail": usermail, "userpwd":userpwd }
  }).done(function(e) {
    console.log(e);
    if(e=="ok"){
      $("#authconfirm").html("<span class='ok'> ok</span>");
      createBallot();
    }
    else if (e=="error"){
        $("#authconfirm").html(
          "<span class='ko'> erreur correspondance mail/mdp</span>");
    }
    else $("#authconfirm").html("<span class='ko'> utilisateur inconnu</span>")

  }).fail(function(e) {
    $("#authconfirm").html("<span class='ko'> ERROR: network problem 9</span>");
  });
}

function createBallot(){
  $("#menu").css("display", "none");
  $("#ballotInfo").css("display", "block");

}

//Ajouter une option de vote
var optioncount = 0;
function addOption() {
    optioncount++;
    var option = document.getElementById("option").cloneNode(true);
    option.id += (optioncount + "");
    document.getElementById("voteOptions").appendChild(option);
}

//Ajouter un votant
var votercount = 0;
function addVoter() {
    votercount++;
    var voter = document.getElementById("voter").cloneNode(true);
    voter.id += (votercount + "");
    document.getElementById("votertable").appendChild(voter);
}