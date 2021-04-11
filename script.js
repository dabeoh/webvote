/****************************************************************/
/*		   Fonctions d'affichage a partir du menu				*/
/****************************************************************/

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

/****************************************************************/
/*		  	 Fonctions utiles création scrutin 					*/
/****************************************************************/

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

//Vérification que le votant inscrit est dans la liste des utilisateurs
//(not working yet)
function checkVoter(v){
  let votermail = $(v).val();
  
  $.ajax({
      method: "GET",
      url: "checkVote.php",
      data: { "votermail": votermail }
    }).done(function (e) {
    console.log(e);
    if (e == "error") {
      console.log("non trouvé");
      $("#checkvote").css("display", "inline-block");
      $("#checkvote").html(
        "<span class='ko'> Cette personne n'a pas droit au vote</span>");   
    }

  }).fail(function (e) {
    console.log(e);
    $("#checkvote").html("<span class='ko'> ERROR: network problem 9</span>");
  });
}

/*	Créer Scrutin 	*/
//Fonction génération du code de scrutin
function generateCode(n) {
        var add = 1, max = 12 - add;

        if ( n > max ) 
          return generate(max) + generate(n - max);

        max        = Math.pow(10, n+add);
        var min    = max/10;
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;

        return ("" + number).substring(add); 
}

//Fonction création du scrutin
function createBallot() {

  //le code du scrutin est un nombre aléatoire à 4 chiffres
  let numscrutin = generateCode(4);

  let creator = $("#usermail").val();
  console.log(creator);

  let question = $("#question").val();
  console.log(question);

  let options = $(".voteoption");
  let opttab = [];

  //création d'un tableau contenant toutes les options
  for (let i = 0; i < options.length; i++) {
    let opt = $(options[i]).val();
    opttab.push(opt);
    console.log(opt);
  }

  let voters = $(".voter");
  let votertab = [];
  let proctab = [];

  //création d'un tableau contenant tous les votants
  //et d'un tableau contenant toutes les procurations
  for (let i = 0; i < voters.length; i++){
    let votermail = $(voters[i]).val();
    votertab.push(votermail);
    let proc = $(voters[i]).parent().find(".procuration").val();
    proctab.push(proc);
    console.log(votermail);
    console.log(proc);
  } 

  $.ajax({
      method: "POST",
      url: "creer_scrutin.php",
      data: { "scrutin": numscrutin, "creator": creator, "question": question,"voters": votertab,"procurations": proctab,  "options": opttab}
    }).done(function(e) {
    console.log("scrutin créé avec succès");

    //rendre impossible la modification du scrutin après création
    $('#question').prop('disabled', true);
    $('#voteOptions').prop('disabled', true);
    $('#voterlist').prop('disabled', true);
    $('#createBallotButton').prop('disabled', true);

    $("#createBallotConfirm").css("display","inline-block");
    $("#createBallotConfirm").html("<span class='ok'>Scrutin créé avec succès.\n \
                                    code Scrutin : "+numscrutin+"</span>");
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
  document.getElementById("voterlist").appendChild(voter);
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

/****************************************************************/
/*		  	 Fonctions utiles Vote à un scrutin					*/
/****************************************************************/

/**
 * Vérifier info login utilisateur
 * Affiche page pour voter au scrutin
**/
function votePage() {
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
      vote();
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

//Vérifie que le code entré existe et que la personne a le droit d'y voter
fuction vote(){
	let usermail = $("#usermail").val();
  	let userpwd = $("#userpwd").val(); 
  	let ballotNumber = $("#ballotNumber").val();

  	$.ajax({
    method: "POST",
    url: "vote.php",
    data: { "usermail": usermail, "userpwd":userpwd, "ballotNumber": ballotNumber }
  }).done(function(e) {
    //console.log(e);

    if(e.ballotid != codeid){
      $("#msgvote").html("<span class='ko'> ERROR: wrong ballot id</span>");
    } else if (publicKey.indexOf("-----BEGIN PUBLIC KEY-----")>=0){
      $("#msg0").fadeOut( "slow", function() {
        $("#voterid").val($("#nameid").val());
        $("#voterpasswd").val($("#password").val());

        $("#ballotid").val($("#codeid").val());
        $("#questionid").val(e.question);

        $("#msg0").css("display", "none");
        $("#msg2").css("display", "block");
        dragElement(document.getElementById("msg2"));
        let options = e.options.split(',');
        for (let i=0;i<options.length;i++){
          //$("#optvote").prepend("<option "+(i==options.length-1?'selected':'')+" value='"+options[i]+"'>"+options[i]+"</option>")
          if (options[i].trim()!="")
            $("#rbvote").prepend("<label><input type='radio' onchange='updateRBVote()' name= 'persvote' value='"+options[i]+"'</input>"+options[i]+"</label><br>");
         }
      });
    } else
      $("#msgvote").html("<span class='ko mini'> ERROR:<br> "+nameid+"<br>cannot vote for #"+codeid+"</span>");
  }).fail(function(e) {
    console.log(e);
    $("#msgvote").html("<span class='ko'> ERROR: network problem 5 </span>");
  });

}