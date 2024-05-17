<?php
$conn = null;
$conn = checkDbConnection();
$about = new About($conn);
$error = [];
$returnData = [];
if (array_key_exists("aboutid", $_GET)) {
    checkPayload($data);
    $about->about_aid = $_GET['aboutid'];
    $about->about_small_title = checkIndex($data, "about_small_title");
    $about->about_title = checkIndex($data, "about_title");
    $about->about_description_1= checkIndex($data, "about_description_1");
    $about->about_description_2= checkIndex($data, "about_description_2");
    $about->about_image = checkIndex($data, "about_image");
    $about->about_btn_title = checkIndex($data, "about_btn_title");
    $about->about_datetime = date("Y-m-d H:i:s");
    
    checkId($about->about_aid);
    // $about_name_old = checkIndex($data, "about_name_old");
    // compareName($about, $about_name_old, $about->about_name);
    $query = checkUpdate($about);
    returnSuccess($about, "about", $query);
}

checkEndpoint();