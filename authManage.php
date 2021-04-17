<?php
    $file = 'scrutin.json';
    $contents = file_get_contents($file);
    $data = json_decode($contents, true);

    $creator = htmlspecialchars($_POST["usermail"]);
    $ballotNumber =($_POST["ballotNumber"]);
    $result = array();
        if(isset($data[$ballotNumber]) 
            && ($data[$ballotNumber]["creator"]==$creator       
            || ($data[$ballotNumber]["etat"]=="fermé"
            &&  in_array($creator, array_keys($data[$ballotNumber]["electeurs"])))))
        {
              $result = array(
                "check"=>1,
                "res"=> $data[$ballotNumber]['points'],
                "sum"=> array_sum($data[$ballotNumber]['points'])
              );
              echo json_encode($result);
              die();
        }
        else if(isset($data[$ballotNumber])
            && $data[$ballotNumber]["creator"] !=$creator)
        {
          $result = array("check"=>2);
          echo json_encode($result);
          die();
        }
        else if(!isset($data[$ballotNumber])
            && $data[$ballotNumber]["creator"] == $creator)
        {
          $result = array("check"=>2);
          echo json_encode($result);
          die();
        }

    array_push($result, array("check"=>-1));
    echo json_encode($result);
?>