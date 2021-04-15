<?php
  $file = 'scrutin.json';
  $jsonString = file_get_contents($file);
  $data = json_decode($jsonString, true);
  $usermail = htmlspecialchars($_POST["usermail"]);
  $ballotNumber = htmlspecialchars($_POST["ballotNumber"]);
  //echo $ballotNumber;

  $vote =$_POST['vote'];

   if($data[$ballotNumber]["electeurs"][$usermail]["reste"]>0){
    //echo $value['numscrutin'];
         if($data[$ballotNumber]['points'][$vote] ){
            $data[$ballotNumber]['points'][$vote]+= 1;
            $data[$ballotNumber]["electeurs"][$usermail]["reste"]-= 1;

        }
        else {
       $data[$ballotNumber]['points'][$vote] =1;
       $data[$ballotNumber]["electeurs"][$usermail]["reste"]-= 1;
      }
        $json = json_encode($data, JSON_PRETTY_PRINT);
            file_put_contents("scrutin.json", $json);
        echo "ok";
    }
    else
      echo "error";
?>
