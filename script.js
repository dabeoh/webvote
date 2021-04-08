//Fonctions d'affichage a partir du menu

//Afficher page identification pour voter
function toggleVote() {
  $("#userInfo").css("display", "block");
  $("#ballotCode").css("display", "block");
  $("#voteButton").css("display", "block");
  $("#accueil").css("display", "inline-block");
  $("#authconfirm").css("display", "inline-block");

  //cacher boutons init
  $("#toggleCreate").css("display", "none");
  $("#toggleManage").css("display", "none");
  $("#toggleVote").css("display", "none");
}

//Afficher page identification pour créer scrutin
function toggleCreate() {
  $("#userInfo").css("display", "block");
  $("#createButton").css("display", "inline-block");
  $("#accueil").css("display", "inline-block");
  $("#authconfirm").css("display", "inline-block");
  //cacher boutons init
  $("#toggleCreate").css("display", "none");
  $("#toggleManage").css("display", "none");
  $("#toggleVote").css("display", "none");
}

//Afficher page identification pour gérer scrutin
function toggleManage() {
  //Affichage nouvelle page
  $("#userInfo").css("display", "block");
  $("#ballotCode").css("display", "block");
  $("#manageButton").css("display", "block");
  $("#accueil").css("display", "inline-block");
  $("#authconfirm").css("display", "inline-block");

  //cacher boutons init
  $("#toggleCreate").css("display", "none");
  $("#toggleManage").css("display", "none");
  $("#toggleVote").css("display", "none");
}

/**
 * Vérifier info login utilisateur
 * Affiche page pour créer scrutin
 */
function createPage() {
  let usermail = $("#usermail").val();
  let userpwd = $("#userpwd").val();

  $.ajax({
    method: "GET",
    url: "auth.php",
    data: { "usermail": usermail, "userpwd": userpwd }
  }).done(function (e) {
    console.log(e);
    if (e == "ok") {
      $("#authconfirm").html("<span class='ok'> ok</span>");
      $("#menu").css("display", "none");
      $("#ballotInfo").css("display", "block");
    }
    else if (e == "error") {
      $("#authconfirm").html(
        "<span class='ko'> erreur correspondance mail/mdp</span>");
    }
    else $("#authconfirm").html("<span class='ko'> utilisateur inconnu</span>")

  }).fail(function (e) {
    console.log(e);
    $("#authconfirm").html("<span class='ko'> ERROR: network problem 9</span>");
  });
}

//Créer scrutin
function createBallot() {

  let creator = $("#usermail").val();
  console.log(creator);

  let question = $("#question").val();
  console.log(question);

  let options = $(".voteoption");
  for (let i = 0; i < options.length; i++) {
    let opt = $(options[i]).val();
    console.log(opt);
  }

  let voters = $(".voter");
  for (let i = 0; i < voters.length; i++) {
    let votermail = $(voters[i]).val();
    let proc = $(voters[i]).parent().find(".procuration").val();
    console.log(votermail);
    console.log(proc);
  } 

  $.ajax({
      method: "POST",
      url: "creer_crutin.php",
      data: { "creator": creator, "voters": voters, "question": question, "options": options}
    }).done(function(e) {
    
    }).fail(function(e) {
      console.log(e);
    });
}

//Ajouter une option de vote
let optionID = 0;
let optioncount = 1;
function addOption() {
  optioncount++;
  optionID++;
  let option = document.getElementById("option").cloneNode(true);
  option.id += (optionID + "");
  document.getElementById("voteOptions").appendChild(option);
}

//Supprimer une option de vote
function deleteOption(opt) {
  console.log(optioncount);
  if (optioncount > 1 && $(opt).parent().attr('id') != "option") {
    $(opt).parent().remove();
    optioncount--;
  }
  else console.log("Impossible de supprimer la première option");
}

//Ajouter un votant
let voterID = 0;
let votercount = 1;
function addVoter() {
  votercount++;
  voterID++;
  let voter = document.getElementById("voter").cloneNode(true);
  voter.id += (voterID + "");
  document.getElementById("votertable").appendChild(voter);
}

//Supprimer un votant
function deleteVoter(v) {
  console.log(votercount);
  if (votercount > 1 && $(v).parent().attr('id') != "voter") {
    $(v).parent().remove();
    votercount--;
  }
  else console.log("Il ne peut pas y avoir 0 votants");
}