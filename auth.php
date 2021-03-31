<?php

	$file = 'users.json'; 
	$contents = file_get_contents($file); 
	$data = json_decode($contents, true); 

	$usermail = htmlspecialchars($_GET['usermail']);
	$userpwd = htmlspecialchars($_GET["userpwd"]);

	foreach($data as $key => $value){
        if($usermail == $value['email'] && $userpwd == $value['password']){
        	console.log("Message here");
        	echo "ok";
            return true;
        }
        else{
        	console.log("Message");
        	echo "error";
        	return false;	
        } 
    }
?>