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

      <!--main menu-->
    	<button id="toggleVote" onclick="toggleVote();">
    	Voter</button>

    	<button id="toggleCreate" onclick="toggleCreate();">
    	creer un scrutin</button>

    	<button id="toggleManage" onclick="toggleManage();">
    	gerer un scrutin</button>

      <!--form login user-->
      <div id = "userInfo" style = "display : none">
        <label for="Adresse mail" id="usermail"> Adresse mail</label>
        <input type="mail" name="mail"> <br> <br>
        <label for="password" id="userpwd"> Mot de passe</label>
        <input type="password" name="password"> <br>
      </div>

      <!--text area for ballot code-->
      <div id = "ballotCode" style = "display : none">
        <label for="Numéro du scrutin"> Numéro du scrutin : </label><br>
        <input type="number" name="ballotNumber"> <br>
      </div>

      <!--bouton activation vote-->
      <button id="voteButton" onclick="vote();" style = "display : none">
      Voter</button>

      <!--bouton activation creer scrutin-->
      <button id="createButton" onclick="create();" style = "display : none">
      Créer</button>

      <!--bouton activation gerer scrutin-->
      <button id="manageButton" onclick="manage();" style = "display : none">
      Gérer</button>

      <!--Message de confirmation de l'authentification-->
      <br>
      <span style="display:none" id="authconfirm"></span>
      <br><br>

      <!--bouton retour menu-->
      <button id="accueil" onclick="window.location.href='.'"
      style = "display : none">Retour Menu</button>

    </div>
  </body>
</html>