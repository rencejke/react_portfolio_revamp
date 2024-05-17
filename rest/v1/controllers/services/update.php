<?php
$conn = null;
$conn = checkDbConnection();
$services = new Services($conn);
$error = [];
$returnData = [];
if (array_key_exists("servicesid", $_GET)) {
    checkPayload($data);
    $services->services_aid = $_GET['servicesid'];
    $services->services_type = checkIndex($data, "services_type");
    $services->services_image= checkIndex($data, "services_image");
    $services->services_description= checkIndex($data, "services_description");
    $services->services_btn_title = checkIndex($data, "services_btn_title");
    $services->services_datetime = date("Y-m-d H:i:s");
    
    checkId($services->services_aid);
    // $services_name_old = checkIndex($data, "services_name_old");
    // compareName($services, $services_name_old, $services->services_name);
    $query = checkUpdate($services);
    returnSuccess($services, "services", $query);
}

checkEndpoint();