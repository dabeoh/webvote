<?php

    $file = 'users.json';
    $contents = file_get_contents($file);
    $data = json_decode($contents, true);

    $usermail = htmlspecialchars($_POST["usermail"]);
    $userpwd = htmlspecialchars($_POST["userpwd"]);

    foreach($data as $key => $value){
        if($usermail == $value['email'] && $userpwd == $value['password']){
            echo "ok";
          die();
        }
        else if($usermail == $value['email'] && $userpwd != $value['password'])
        {
            echo "error";
            die();
        }
    }
    echo "unknown";
?>
