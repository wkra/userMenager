<?php

header('Content-type: application/json');

require_once('connect.php');

$table = $_GET['table'];

$zapytanie_pobierz = "SELECT * FROM $table";

$wynik_pobierz = mysqli_query($db, $zapytanie_pobierz);

$pobrane_dane = array();

while ($wiersz = mysqli_fetch_row($wynik_pobierz))
{
  $pobrane_dane[] = $wiersz;
}

if (mysqli_connect_errno()){
  echo "Error";
  exit;
}

echo json_encode($pobrane_dane);

?>
