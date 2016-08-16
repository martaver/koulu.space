<?php

include 'db.php';
$path_info = array_key_exists('PATH_INFO', $_SERVER) ? $_SERVER['PATH_INFO'] : null;
$pwd = $path_info != null ? ltrim($path_info, "/") : null;

if($pwd == 'reset') {

    $db = new KouluDB('./db/koulu.sqlite');

    $db->recreate();

    $result = $db->getAll();

    echo "Database successfully reset";
}
else {

    echo "Incorrect password";
}

?>