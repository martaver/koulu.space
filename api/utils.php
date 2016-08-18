<?php

function reject(){
    header('Location: http://koulu.space/');
    die();
}

function error400($message) {
    
    http_response_code(400);
    echo($message);
    die();
}

function loadTeacherByAppendedCode() {
    $code = ltrim($_SERVER['PATH_INFO'], "/");
    if (!ctype_alnum($code)) reject();
    $db = new KouluDb('./db/koulu.sqlite');
    $result = $db->getByCode($code);
    $teacher = $result->fetchArray();
    if($teacher == false) reject();
    return $teacher;
}

function saveFile($file, $target_dir, $file_name_noext) {

    $uploadOk = 1;

    $imageFileType = pathinfo($file["name"],PATHINFO_EXTENSION);
    $target_file = $target_dir . $file_name_noext.".".$imageFileType;

    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($file["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // Check file size
    if ($file["size"] == 0) {
        echo "Your posted no data.";
        $uploadOk = 0;
    }

    // Check file size
    if ($file["size"] > 4000000) {
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
        return $uploadOk;
    // if everything is ok, try to upload file
    } else {
        
        //Create target directory if it doesn't already exist.
        if(!file_exists($target_dir)) { mkdir($target_dir); }        
        
        $from = $file["tmp_name"];
        if (!move_uploaded_file($from, $target_file)) {            
            echo "Sorry, there was an error uploading your file.";
            return $uploadOk;
        }
    } 

    return $uploadOk;
}

?>