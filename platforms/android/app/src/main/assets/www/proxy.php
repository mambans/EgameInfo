<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (isset($_GET["url"])) {
    // create curl resource
    $ch = curl_init();

    // set url
    curl_setopt($ch, CURLOPT_URL, $_GET["url"]);

    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // $output contains the output string
    $output = curl_exec($ch);

    // close curl resource to free up system resources
    curl_close($ch);

    exit($output);
}

$error = json_encode(["message" => "No url GET param"]);

exit($error);
