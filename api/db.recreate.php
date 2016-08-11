<?php

include 'db.php';

if(!file_exists('./db')) { mkdir('./db'); }

$db = new KouluDB();

$db->recreate();

$result = $db->getAll();

echo(json_encode($result->fetchArray()));

?>