<?php

header('Content-type: application/json');

require_once('connect.php');


$zapytanie_pobierz = "SELECT * FROM groups";

$wynik_pobierz = mysqli_query($db, $zapytanie_pobierz);

$pobrane_dane = array();

while ($wiersz = mysqli_fetch_row($wynik_pobierz)) 
{
  $pobrane_dane[] = $wiersz;
}

echo json_encode($pobrane_dane);

?>