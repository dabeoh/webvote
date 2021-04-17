<?php

$file = 'scrutin.json';
$contents = file_get_contents($file);
$data = json_decode($contents, true);

$votermail = htmlspecialchars($_POST["usermail"]);
$ballotNumber = $_POST["ballotNumber"];
$result = array();
 // check if exist: yes -> vérifier si il a le droit de voter & scrution ouvert ;no-> response: not found
if(
  isset($data[$ballotNumber])
  && in_array($votermail, array_keys($data[$ballotNumber]["electeurs"]))
  && $data[$ballotNumber]["etat"]=="ouvert"
  && $data[$ballotNumber]["electeurs"][$votermail]["reste"] > -1
)
{

  $result = array(
    "check"=>1,
    "voter"=>$votermail,
    "question"=> $data[$ballotNumber]['question'],
    "options"=> $data[$ballotNumber]['options'],
    " reste" =>$data[$ballotNumber]["electeurs"][$votermail]['reste']
  );



  echo json_encode($result);
  die();

}else if ($data[$ballotNumber]){
 $result = array("check"=>0);
 echo json_encode($result);
 die();
}

array_push($result, array("check"=>-1));
echo json_encode($result);

?>
