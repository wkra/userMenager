<?php

require_once('connect.php');

$id = $_POST['id'];

$query_delete = "DELETE FROM `groups` WHERE `groups`.`id` = $id";

$wynik = mysqli_query($db, $query_delete);

?>