<?php

require_once('connect.php');

function filter($data){
  $data = substr($data, 0, 30);
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data); 
  return $data; 
}

$name = $_POST['name'];
$password = $_POST['password'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$dateBirth = $_POST['dateBirth'];
$group = $_POST['group'];

$nameFilter = filter($name);
$passwordFilter = filter($password);
$firstNameFilter = filter($firstName);
$lastNameFilter = filter($lastName);
$dateBirthFilter = filter($dateBirth);
$groupFilter = filter($group);

$query = "INSERT INTO `users` ( `name`, `password`, `firstName`, `lastName`, `dateBirth`, `group`) VALUES ('$nameFilter', '$passwordFilter', '$firstNameFilter', '$lastNameFilter', '$dateBirthFilter', '$groupFilter');";

$send = mysqli_query($db, $query);
?>