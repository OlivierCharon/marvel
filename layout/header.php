<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Color it!</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>

<?php
    if("$_SERVER[REQUEST_URI]" == '/') {
        require_once 'db/db.php';
    } else {
        require_once '../db/db.php';
    }
?>

<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark container-fluid">
        <div class="row">
            <div class="col-md-12">
                <img src="../content/marvel_logo.png" alt="Marvel logo">
            </div>
        </div>
        <div class="row nav-menu">
            <div class="col-md-12">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                        aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
               
                
                <div class="collapse navbar-collapse justify-content-center" id="navbarColor02">
    
                    <?php
                        $_POST['errorCode'] = 429;
                        if("$_SERVER[REQUEST_URI]" == '/'){ ?>
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    <?php } else if("$_SERVER[REQUEST_URI]" == '/pages/error.php') { ?>
                        <h1>Erreur <?= $_POST['errorCode'] ?></h1>
                    <?php } else { ?>
                        <h1>ERROR</h1>
                    <?php }?>
                </div>
            </div>
        </div>
    </nav>
</header>

