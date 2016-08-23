<?php

include 'db.php';
include 'utils.php';

//Extract name, email and topic from FORM POST.
$name = array_key_exists('person_name', $_POST) ? $_POST['person_name'] : NULL;
$email = array_key_exists('person_email', $_POST) ? $_POST['person_email'] : NULL;
$topic = array_key_exists('person_topic', $_POST) ? $_POST['person_topic'] : NULL;

$hasTopics = $name != NULL && $topic != NULL;

if(empty($_FILES)) error400('No image file uploaded.');
if(!$hasTopics) error400('One or more required fields are missing.');

$db = new KouluDb('./db/koulu.sqlite');

//Generate a code that doesn't conflict with existing codes.
$code = null;
$existing = null;
while($code == null && $existing == null) {

    $proposedCode = sprintf('%04X', mt_rand(0, 65535));
    $existing = $db->querySingle("SELECT code from person where code = '".$proposedCode."'");        
    if($existing == null) $code = $proposedCode;
}

//Insert the record into the DB & get the ID.
$db->insert($code, $name, $email, $topic);    
$id = $db->lastInsertRowID();

//Save the image in selfies under the same ID.
$target_dir = "selfies/";
$uploadOk = 1;

$selfieOk = saveFile($_FILES["person_selfie"], $target_dir, $id);
$thumbOk = saveFile($_FILES["thumb_person_selfie"], $target_dir."thumb/", $id);

if($selfieOk == 0 || $thumbOk == 0) echo "There were one or more errors with your upload.";
else echo "{ \"id\": ".$id.", \"code\": \"".$code."\"}";
?>