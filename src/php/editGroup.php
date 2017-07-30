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

$id = $_POST['id'];
$name = $_POST['name'];

$nameFilter = filter($name);

$query = "UPDATE `groups` SET `name` = '$nameFilter' WHERE `groups`.`id` = '$id';";

$send = mysqli_query($db, $query);
?>