<?php
    
    $request = $_SERVER['REQUEST_URI'];
    
    switch ($request) {
        case '/' :
            require __DIR__ . '/pages/home.php';
            break;
        case '/error' :
            require __DIR__ . '/pages/error.php';
            break;
        case '/event/'.$_GET['eventTitle'] :
            require __DIR__ . '/pages/event.php';
            break;
        default:
            http_response_code(404);
            require __DIR__ . '/pages/404.php';
            break;
    }