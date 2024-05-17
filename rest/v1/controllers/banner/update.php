<?php
$conn = null;
$conn = checkDbConnection();
$banner = new Banner($conn);
$error = [];
$returnData = [];
if (array_key_exists("bannerid", $_GET)) {
    checkPayload($data);
    $banner->banner_aid = $_GET['bannerid'];
    $banner->banner_title_1 = checkIndex($data, "banner_title_1");
    $banner->banner_image = checkIndex($data, "banner_image");
    $banner->banner_description = checkIndex($data, "banner_description");
    $banner->banner_btn_title = checkIndex($data, "banner_btn_title");
    $banner->banner_btn_title_2= checkIndex($data, "banner_btn_title_2");
    $banner->banner_datetime = date("Y-m-d H:i:s");
    
    checkId($banner->banner_aid);
    // $banner_name_old = checkIndex($data, "banner_name_old");
    // compareName($banner, $banner_name_old, $banner->banner_name);
    $query = checkUpdate($banner);
    returnSuccess($banner, "banner", $query);
}

checkEndpoint();