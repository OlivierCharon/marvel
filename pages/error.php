<?php
    require_once('../layout/header.php');
    $_POST['errorCode'] = 429;
    if($_POST['errorCode'] == 429) {
        ?>
    
        <main class="container" id="error">
        
        <h1 class="text-center">Too many requests attempted. <br> Please, try again tomorrow</h1>
        
        </main>
        
        <?php
    }
    
    var_dump("http://$_SERVER[HTTP_HOST]");
    var_dump("$_SERVER[REQUEST_URI]");
    
    require_once('../layout/footer.php');
?>