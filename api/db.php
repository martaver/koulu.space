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

    function recreate() {
        $this->exec('DROP TABLE if exists person');
        $this->exec('CREATE TABLE person (id INTEGER PRIMARY KEY, code char(3), name nvarchar(255), email nvarchar(255), topic nvarchar(255))');
    }

    function getAll() {
        return $this->query('SELECT * FROM person');
    }

    function insert($code, $name, $email, $topic) {
        $this->exec("INSERT INTO person (id, code, name, email, topic) VALUES (NULL, '".$code."', '".$name."', '".$email."', '".$topic."')");
    }

    function getByCode($code) {
        return $this->querySingle("SELECT * FROM person WHERE $code = '".$code."'");
    }
}

?>