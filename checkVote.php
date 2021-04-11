<?php

	$file = 'users.json'; 
	$contents = file_get_contents($file); 
	$data = json_decode($contents, true); 
  error_log($contents);

	$votermail = htmlspecialchars($_GET["votermail"]);
	
	foreach($data as $key => $value){
        if($votermail == $value['email']){
            echo "ok";
            die();
        }
        else
        {
        	echo "error";
        	die();	
        }
    }
?>