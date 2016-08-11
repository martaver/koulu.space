<?php
/**
 * Simple example of extending the SQLite3 class and changing the __construct
 * parameters, then using the open method to initialize the DB.
 */
class KouluDB extends SQLite3
{
    function __construct()
    {
        $this->open('./db/koulu.sqlite');
    }
}

if(!file_exists('./db')) { mkdir('./db'); }

$db = new KouluDB();

$db->exec('DROP TABLE if exists person');
$db->exec('CREATE TABLE person (id INTEGER PRIMARY KEY, code char(3), name nvarchar(255), email nvarchar(255), topic nvarchar(255))');

$result = $db->query('SELECT * FROM person');
echo(json_encode($result->fetchArray()));
?>