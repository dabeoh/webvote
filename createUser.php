<?php

$file = 'users.json';
  $jsonString = file_get_contents($file);
  $data = json_decode($jsonString, true);

  $usermail =$_POST['usermail'];
  $nom =$_POST['nom'];
  $prenom =$_POST['prenom'];
  $password =$_POST['password'];

  $data []= array(
   "prenom"=> $prenom,
   "nom"=> $nom,
   "email"=> $usermail,
   "password"=> $password
);


  $json = json_encode($data, JSON_PRETTY_PRINT);
  file_put_contents("users.json", $json);
?>

