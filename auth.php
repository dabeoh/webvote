<php?
$usermail = htmlspecialchars($_GET["usermail"]);
echo $usermail;
$userpwd = htmlspecialchars($_GET["userpwd"]);
$file = 'users.json'; 
$contents = file_get_contents($file); 
$data = json_decode($contents); 
?>