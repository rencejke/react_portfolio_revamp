<?php
$conn = null;
$conn = checkDbConnection();
$about = new About($conn);
if (array_key_exists("aboutid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$about->about_small_title = checkIndex($data, "about_small_title");
$about->about_title = checkIndex($data, "about_title");
$about->about_description_1= checkIndex($data, "about_description_1");
$about->about_description_2= checkIndex($data, "about_description_2");
$about->about_image = checkIndex($data, "about_image");
$about->about_btn_title = checkIndex($data, "about_btn_title");
$about->about_is_active = 1;
$about->about_created = date("Y-m-d H:i:s");
$about->about_datetime = date("Y-m-d H:i:s");

// istitleExist($about, $about->about_title);

$query = checkCreate($about);
returnSuccess($about, "about", $query);