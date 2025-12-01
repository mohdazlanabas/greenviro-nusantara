<?php
// Redirect all requests to public_html subdirectory
$request_uri = $_SERVER['REQUEST_URI'];
$script_name = dirname($_SERVER['SCRIPT_NAME']);

// Remove script path from request URI if present
if (strpos($request_uri, $script_name) === 0) {
    $request_uri = substr($request_uri, strlen($script_name));
}

// Include the actual index.php from public_html
require __DIR__ . '/public_html/index.php';
