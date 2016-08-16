<?php

include 'db.php';
include 'utils.php';

//Extract name, email and topic from FORM POST.
$name = array_key_exists('person_name', $_POST) ? $_POST['person_name'] : NULL;
$email = array_key_exists('person_email', $_POST) ? $_POST['person_email'] : NULL;
$topic = array_key_exists('person_topic', $_POST) ? $_POST['person_topic'] : NULL;

$hasTopics = $name != NULL && $email != NULL && $topic != NULL;

if(empty($_FILES)) error400('No image file uploaded.');
if(!$hasTopics) error400('One or more required headers are missing.');

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
$target_file = $target_dir . $id.".png";
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["person_selfie"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check file size
if ($_FILES["person_selfie"]["size"] > 4000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    
    //Create target directory if it doesn't already exist.
    if(!file_exists($target_dir)) { mkdir($target_dir); }        

    if (move_uploaded_file($_FILES["person_selfie"]["tmp_name"], $target_file)) {
        echo "{ \"id\": ".$id.", \"code\": \"".$code."\"}";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
} 
?>