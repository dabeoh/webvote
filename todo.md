# A Faire

- Trouver comment faire pour récupérer les infos entrées dans la création de vote pour faire un scrutin

## creation scrutin
- check que c'est bien une adresse mail qui est entrée
- empêcher de mettre plus que 2 procurations
- listes prédéfinies

## id vote - gerer scrutin - voter
- checker que la personne est bien dans le scrutin

### check scrutin
id : $usermail
nb_proc : indice(["electeurs"]["electeur"][$votermail])
          DANS ["electeurs"]["proc"]
question : $question (dans le tab de l'id du scrutin)
options : $option (dans le tab de l'id du scrutin)