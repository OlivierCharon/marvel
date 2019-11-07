<?php
    require_once('layout/header.php');
?>
    
    <main class="container" id="home">
        <!--    <img src="content/cookie.png" alt="cookie" id="cookie">-->
        
        <!--        <label for="pkmnName">-->
        <!--            <input type="text" id="pkmnName">-->
        <!--        </label>-->
        <!--        <button id="getPkmnButton"> Get the pkmn ! </button>-->
        <form style="display:hidden" action="/pages/error.php" method="POST" id="apiError">
            <input type="hidden" id="errorCode" name="errorCode" value=""/>
        </form>
    
    </main>

<?php
    require_once('layout/footer.php');
?>