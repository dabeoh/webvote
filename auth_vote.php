<?php

	$file = 'scrutin.json'; 
	$contents = file_get_contents($file); 
	$data = json_decode($contents, true); 
  error_log($contents);

	$votermail = htmlspecialchars($_POST["usermail"]);
	$ballotNumber = $_POST["ballotNumber"];
  $result = array();

  foreach($data as $key => $value){
        if($ballotNumber == $value['num_scrutin'] && in_array($votermail, $value["electeurs"]["electeur"]))
        {
          array_push($result, array("check"=>1, "voter"=>$votermail, "question"=>$value["question"], "options"=>$value["options"]));
          echo json_encode($result);
          die();
        }

        else if($ballotNumber == $value['num_scrutin'] && in_array($votermail, $value["electeurs"]["electeur"])==FALSE)
        {
        	array_push($result, array("check"=>0));
          echo json_encode($result);
        	die();	
        }
    }
    array_push($result, array("check"=>-1));
    echo json_encode($result);
?>