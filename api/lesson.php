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

  <body class="bg">

    <div class="container">
      <div class="koulu-toolbar-container">
        <div class="koulu-toolbar">
          
          <div class="koulu-toolbar-logo">
            <a href="javascript:history.back()"><img src="/assets/img/koulu-logo.png"></a>
          </div>      
          <div class="koulu-toolbar-content">Graduation</div>
          <div class="koulu-toolbar-menu"></div>
        </div>  
      </div>

      <div class="panel hint">
        <span>Tip: Screenshot this page :)
      </div>

<div class="panel" style="padding: 12px;">

  <div class="topic center" style="margin-bottom: 12px;"><?php echo $teacher["topic"] ?></div>

  <div class="center">
    <div class="constrain-ratio-1-1" style="width: 60%">
      <div class="constrain-ratio-content">
        <div class="circle" style="background-image: url(/api/selfies/thumb/<?php echo $teacher["id"] ?>.jpeg); width: 100%; height: 100%;"></div>
      </div>
    </div>
  </div>

  <div class="name center">with <?php echo $teacher["name"] ?></div>

</div>

<div class="panel">
  <div class="para row">
    <div class="instructions">To get in touch with <span style="color: #f0f0f0"><?php echo $teacher["name"] ?></span> after the burn, save this page to your homescreen.</div>
  </div>
</div>

<div class="panel">
<div class="instructions">Or, go to: <span style="text-decoration: underline;">http://koulu.space/</span> and enter the code:</div>
    </div>

    <div class="panel center topic end scale-text">
      <?php echo $teacher["code"] ?>
    </div>
    </div>

  </body>

  </html>