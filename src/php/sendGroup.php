<?php

require_once('connect.php');

function filter($data) 
{
  $data = substr($data, 0, 30);
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data); 
  return $data; 
}

$name = $_POST['name'];

$nameFilter = filter($name);

$query = "INSERT INTO `groups` (`name`) VALUES ('$name');";

$send = mysqli_query($db, $query);
?>