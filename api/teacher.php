<?php

include 'db.php';
include 'utils.php';

$teacher = loadTeacherByAppendedCode();

?>

<!DOCTYPE html>
<html lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Koulu on Fire</title>

  <meta name="description" content="Koulu on Fire">  
  <link href="/assets/css/style.css" rel="stylesheet">
</head>

<body class="container">  

  <div class="koulu-toolbar">
      
      <div class="koulu-toolbar-logo">
        <a href="javascript:history.back()"><img src="/assets/img/koulu-logo.png"></a>
      </div>      
      <div class="koulu-toolbar-content">Graduation</div>
      <div class="koulu-toolbar-menu"></div>
  </div>  

  <div class="panel hint">
    <span>Tip: Screenshot this page :)</div>
  </div>  

  <div class="panel" style="padding: 12px;">    
    <div class="topic center" style="margin-bottom: 12px;">You're in!</div>
    <div class="center" style="margin-bottom: 12px;">
        <div class="snapshot-container">
            <img class="snapshot" src="/selfies/<?php echo $teacher["id"] ?>.png">
        </div> 
    </div>
    <div class="name center">Welcome, <?php echo $teacher["name"] ?>.</div>
  </div>  

  <div class="panel">    
    <div class="instructions">Your Koulu code is:</div>        
  </div>

  <div class="panel center topic" style="padding: 12px;">
    <?php echo $teacher["code"] ?>
  </div>

  <div class="panel instructions end">    
    <div>Use the code to stay in touch with your students:</div>
    <ol>        
        <li>Get some tokens (ask the staff).</li>
        <li>Write your code on them.</li>
        <li>Give them to your students.</li>        
    </ol>
  </div>

</body>
</html>