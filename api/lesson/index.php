Welcome to the lesson.

<?php

include '../db.php';

$code = ltrim($_SERVER['PATH_INFO'], "/");

if (!ctype_alnum($code)) http_response_code(404);

$db = new KouluDb();

?>