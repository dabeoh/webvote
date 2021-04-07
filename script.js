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
var optionID = 0;
var optioncount = 1;
function addOption() {
    optioncount++;
    optionID++;
    var option = document.getElementById("option").cloneNode(true);
    option.id += (optionID + "");
    document.getElementById("voteOptions").appendChild(option);
}

//Supprimer une option de vote
function deleteOption(opt){
  console.log(optioncount);
  if(optioncount > 1 && $(opt).parent().attr('id') != "option"){
    $(opt).parent().remove();
    optioncount--;
  }
  else console.log("Impossible de supprimer la première option");
}

//Ajouter un votant
var voterID = 0;
var votercount = 1;
function addVoter() {
    votercount++;
    voterID++;
    var voter = document.getElementById("voter").cloneNode(true);
    voter.id += (voterID + "");
    document.getElementById("votertable").appendChild(voter);
}

//Supprimer un votant
function deleteVoter(v){
  console.log(votercount);
  if(votercount > 1 && $(v).parent().attr('id') != "voter"){
    $(v).parent().remove();
    votercount--;
  }
  else console.log("Il ne peut pas y avoir 0 votants");
}