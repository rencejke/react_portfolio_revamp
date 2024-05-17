<?php
$conn = null;
$conn = checkDbConnection();
$services = new Services($conn);
if (array_key_exists("servicesid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$services->services_type = checkIndex($data, "services_type");
$services->services_image= checkIndex($data, "services_image");
$services->services_description= checkIndex($data, "services_description");
$services->services_btn_title = checkIndex($data, "services_btn_title");
$services->services_is_active = 1;
$services->services_created = date("Y-m-d H:i:s");
$services->services_datetime = date("Y-m-d H:i:s");

// istitleExist($services, $services->services_title);

$query = checkCreate($services);
returnSuccess($services, "services", $query);