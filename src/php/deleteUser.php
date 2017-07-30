<?php

require_once('connect.php');

$id = $_POST['id'];

$query_delete = "DELETE FROM `users` WHERE `users`.`id` = $id";

$wynik = mysqli_query($db, $query_delete);

?>