<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>Web Voting</title>
	<link rel="stylesheet" href="style.css">
	<script src="script.js"></script>
	<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">
</script>
</head>

<body>

	<div class="maindiv">

		<!----------Main Menu---------------------------------->
		<div id="menu">
			<button id="toggleVote" onclick="toggleVote()">
			Voter</button>

			<button id="toggleCreate" onclick="toggleCreate()">
			creer un scrutin</button>

			<button id="toggleManage" onclick="toggleManage()">
			gerer un scrutin</button>

			<!--form login user-->
			<div id = "userInfo" style = "display : none">
				<label for="usermail"> Adresse mail</label>
				<input type="email" id="usermail"> <br> <br>
				<label for="userpwd"> Mot de passe</label>
				<input type="password" id="userpwd"> <br>
			</div>

			<!--text area for ballot code-->
			<div id = "ballotCode" style = "display : none">
				<label for="ballotNumber"> Numéro du scrutin : </label><br>
				<input type="number" id="ballotNumber" min="0" max="9999"> <br>
			</div>

			<!--bouton activation vote-->
			<button id="voteButton" onclick="votePage()" style = "display : none">
			Voter</button>

			<!--bouton activation creer scrutin-->
			<button id="createButton" onclick="createPage()" style = "display : none">
			Créer</button>

			<!--bouton activation gerer scrutin-->
			<button id="manageButton" onclick="manage()" style = "display : none">
			Gérer</button>

			<!--Message de confirmation de l'authentification-->
			<br>
			<span style="display:none" id="authconfirm"></span>
			<br><br>

		</div>

		<!--------Creation Scrutin----------------------------->
		<div id="ballotInfo" style = "display : none">
			<label for="question"> Question :</label>
			<input type="text" id="question"><br><br>

			<label for="options">Options :</label>
			<fieldset id="voteOptions">
				<button id="addoption" onclick="addOption()">Ajouter une Option</button><br>
				<!--div qui se clone au moment d'un ajout d'option-->
				<div id="option">
					<input type="text" class="voteoption" required="true">
					<button onclick="deleteOption(this)">effacer</button>
				</div>
			</fieldset>

			<label for="voters">Liste des Votants</label>
			<fieldset id="voterlist">
				<pre>Votants      Procurations</pre>
				<button id="addvoter" onclick="addVoter()">Ajouter un votant</button></br>
				<br>
				<!--div qui se clone au moment d'un ajout de votant-->
				<div id="voter" class="voterdiv">
					<input class="voter" type="email" onchange="" required="true"> <!--onchange="checkVoter(this)"-->
					<select class="procuration" name="proc_number" size="1" required>
			            <option value="0">0</option>
			            <option value="1">1</option>
			            <option value="2">2</option>
			       	</select>
					<span style="display:none" id="checkvote"></span>
					<button onclick="deleteVoter(this)">effacer</button>
				</div>
			</fieldset>
			<button id="createBallotButton" onclick="createBallot()">Créer le Scrutin</button>
			<span style="display:none" id="createBallotConfirm"></span>
		</div>

		<!--------Vote Scrutin--------------------------------->
		<div id="votingPage" style = "display : none">
			Question :
			<span id="questionfield"></span>
			<br>
			Choix :
			<fieldset id="votingchoice"></fieldset>
			<button id="confirmVoteButton" onclick="confirmVote()">VOTER</button>
		</div>
		<div>
			<!--bouton retour menu-->
			<button id="accueil" onclick="window.location.href='.'" style = "display : none">Retour Menu</button>
		</div>
	</div>
</body>
</html>