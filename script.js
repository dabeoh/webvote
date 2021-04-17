/****************************************************************/
/*		   Fonctions d'affichage a partir du menu		        */
/****************************************************************/

//Afficher page de création de compte
function creerCompte(){
	//affichage formulaire d'inscription
	$("#inscription").css("display", "block");
	$("#createUserButton").css("display","inline-block");
	$("#accueil").css("display", "inline-block");
	$("#authconfirm").css("display", "inline-block");
	//cacher les boutons init
	$("#creercompte").css("display","none");
	$("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display", "none");


}


//Afficher page identification pour voter
function toggleVote() {
	$("#userInfo").css("display", "block");
	$("#ballotCode").css("display", "block");
	$("#voteButton").css("display", "block");
	$("#accueil").css("display", "inline-block");
	$("#authconfirm").css("display", "inline-block");
	//cacher boutons init
	$("#creercompte").css("display","none");
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
	$("#creercompte").css("display","none");
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
	$("#creercompte").css("display","none");
	$("#toggleCreate").css("display", "none");
	$("#toggleManage").css("display", "none");
	$("#toggleVote").css("display", "none");
}

/****************************************************************/
/*		  	 Fonctions utiles création nouvel utilisateur       */
/****************************************************************/

function createUser(){
	let usermail = $("#email").val();
	let nom=$("#nom").val();
	let prenom = $("#prenom").val();
	let password = $("#password").val();
	$.ajax({
		method: "POST",
		url: "createUser.php",
		data: { "usermail": usermail,
		"password" : password,
		"prenom": prenom,
		"nom": nom}

	}).done(function (e) {
		console.log("compte créé avec succès");
		$("#authconfirm").html(
			"<span class='ok'> Utilisateur créé avec succès</span>");
	}).fail(function(e) {
		console.log(e);
	});

}

/****************************************************************/
/*		  	 Fonctions utiles création scrutin 			      	*/
/****************************************************************/

/**
 * Vérifier info login utilisateur
 * Affiche page pour créer scrutin
 */
 function createPage() {
 	let usermail = $("#usermail").val();
 	let userpwd = $("#userpwd").val();

 	$.ajax({
 		method: "POST",
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
		method: "POST",
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
	const votersList  ={}

	//création d'un tableau contenant tous les votants
	//et d'un tableau contenant toutes les procurations
	for (let voter of voters){

		votersList[$(voter).val()] = {
			proc : parseInt($(voter).parent().find(".procuration").val()),
			reste : parseInt($(voter).parent().find(".procuration").val())+1
		}



		console.log(votersList);
	}
	if(opttab.length > 1){
		$.ajax({
		method: "POST",
		url: "createBallot.php",
		data: {
			"scrutin": numscrutin,
			"creator": creator,
			"question": question,
			"voters": votersList,
			"procurations": proctab,
			"options": opttab
		}
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
	else{
		$("#createBallotConfirm").css("display","inline-block");
		$("#createBallotConfirm").html("<span class='ko'>Veuillez sélectionner au moins deux options</span>");
	}
	
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
/*		  	 Fonctions utiles Vote à un scrutin		         	*/
/****************************************************************/

/**
 * Vérifier info login utilisateur
 * Affiche page pour voter au scrutin
 **/
 function votePage() {
 	let usermail = $("#usermail").val();
 	let userpwd = $("#userpwd").val();

 	$.ajax({
 		method: "POST",
 		url: "auth.php",
 		data: { "usermail": usermail, "userpwd": userpwd }
 	}).done(function (e) {
 		console.log(e);
 		if (e == "ok") {
 			$("#authconfirm").html("<span class='ok'> ok</span>");
 			authVote();
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
function authVote(){

	let usermail = $("#usermail").val();
	let ballotNumber = $("#ballotNumber").val();

	$.ajax({
		method: "POST",
		dataType: "json",
		url: "authVote.php",
		data: { "usermail": usermail, "ballotNumber": ballotNumber }
	}).done(function(e) {
		console.log('request successfully ended');
		if (e.check == 1) {
			$("#authconfirm").html("<span class='ok'>scrutin trouvé</span>");
			$("#menu").css("display", "none");
			$("#votingPage").css("display", "block");
			$("#questionfield").html("<span>"+e.question+"</span>");

			let opt = e.options;
			let optdiv = $('<div></div>');
			for (let i=0; i<opt.length; i++){
				let optinput = $("<input type='radio' name= 'choicevote' value='"+opt[i]+"'</input>\
								  <label>"+opt[i]+"</label><br>");
				optdiv.append(optinput);
				$('#votingchoice').append(optdiv);
			}
		}

		else if (e.check == 0) {
			$("#authconfirm").html(
				"<span class='ko'>Vous n'avez pas le droit de voter à ce scrutin</span>");
		}
		else $("#authconfirm").html("<span class='ko'>scrutin inconnu</span>")

	}).fail(function(e) {
		console.log(e);
		$("#authconfirm").html("<span class='ko'> ERROR: network problem 5 </span>");
	});
}


function confirmVote(){

	let usermail = $("#usermail").val();
	let ballotNumber = $("#ballotNumber").val();
	let vote = $("input[name='choicevote']:checked").val();



	$.ajax({
		method: "POST",
		url: "confirmVote.php",
		data: {
			"ballotNumber": ballotNumber,
			"vote" : vote,
			"usermail" : usermail }
		}).done(function(e) {
			console.log(e);
			if (e == "ok") {
				$("#voteconfirm").html("<span class='ok'>vote enregistré avec succès</span>");
			}
			else if(e == "error") {
				console.log("vote non enregistré");

				$("#voteconfirm").html("<span class='ko'>vous n'avez plus le droit de voter</span>");
				$("#votingchoice").prop('disabled', true);
				$("#confirmVoteButton").prop('disabled', true);

			}
		}).fail(function(e) {
			console.log(e);

			$("#voteconfirm").html("<span class='ko'> ERROR: network problem 5 </span>");
		});
		console.log('hi3')
	}


	/****************************************************************/
	/*		  	 Fonctions utiles Gérer un scrutin				          	*/
	/****************************************************************/


	function manage() {

		let usermail = $("#usermail").val();
		let userpwd = $("#userpwd").val();
		let ballotNumber = $("#ballotNumber").val();

		$.ajax({
			method: "POST",
			url: "auth.php",
			data: { "usermail": usermail, "userpwd": userpwd }
		}).done(function (e) {
			console.log(e);
			if (e == "ok") {
				$("#authconfirm").html("<span class='ok'> ok </span>");
				authManage();
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

function authManage(){

	let usermail = $("#usermail").val();
	let ballotNumber = $("#ballotNumber").val();

	$.ajax({
 		method: "POST",
    dataType: "json",
 		url: "authManage.php",
 		data: { "usermail": usermail, "ballotNumber": ballotNumber }
 	}).done(function (e) {
     console.log(e);
 		if (e.check == 1) {
       $("#authconfirm").html(
 				"<span class='ko'>Trouvé</span>");
      //  Affichage page gestion du scrutin après identification
      $("#menu").css("display", "none");
 			$("#managePage").css("display", "block");
      console.log(e.res);
      $("#nbvote").html("<br><span><b>Total Votes : "+e.sum+"</b></span><br>");
      let resdiv = $('<div></div>');
      $.each( e.res, function( opt, score ) {
        $("#results").append("<span>"+opt+" : "+score+"</span><br>"); 
      });
 		}
 		else if (e.check == 2) {
      console.log(e);
 			$("#authconfirm").html(
 				"<span class='ko'> Vous n'êtes pas créateur de ce scrutin</span>");
 		}
    else if (e.check == 3) {
 			$("#authconfirm").html(
 				"<span class='ko'>Vous n'êtes pas créateur de ce scrutin</span>");
 		}
 		else $("#authconfirm").html("<span class='ko'> scrutin inconnu</span>")

 	}).fail(function (e) {
 		$("#authconfirm").html("<span class='ko'> ERROR: network problem 9</span>");
 	});
}
function endVote(){
	let ballotNumber = $("#ballotNumber").val();
	$.ajax({
		method: "POST",
		url: "endVote.php",
		data: { "ballotNumber": ballotNumber }
	}).done(function (e) {
		console.log(e);
		$("#results").css("display", "inline-block");

		if(e=="ok"){
			console.log("scrutin fermé");
			$("#manageconfirm").html("<span class='ok'> Scrutin fermé avec succès</span>")
		}

		else $("#manageconfirm").html("<span class='ko'> scrutin déjà clos</span>")

	}).fail(function (e) {
		$("#manageconfirm").html("<span class='ko'> ERROR: network problem 9</span>");
	});
}

