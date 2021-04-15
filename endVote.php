<?php
  $file = 'scrutin.json';
  $jsonString = file_get_contents($file);
  $data = json_decode($jsonString, true);
  $ballotNumber = htmlspecialchars($_POST["ballotNumber"]);

    if($data[$ballotNumber]
      && $data[$ballotNumber]["etat"]== "ouvert"){
      $data[$ballotNumber]["etat"]= "fermé";
      echo "ok";
    }
    else {
      echo "error";
    }
    
  $json = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents("scrutin.json", $json);

?>
