<?php
$conn = null;
$conn = checkDbConnection();
$banner = new Banner($conn);
if (array_key_exists("bannerid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$banner->banner_title_1 = checkIndex($data, "banner_title_1");
$banner->banner_image = checkIndex($data, "banner_image");
$banner->banner_description = checkIndex($data, "banner_description");
$banner->banner_btn_title = checkIndex($data, "banner_btn_title");
$banner->banner_btn_title_2= checkIndex($data, "banner_btn_title_2");
$banner->banner_is_active = 1;
$banner->banner_created = date("Y-m-d H:i:s");
$banner->banner_datetime = date("Y-m-d H:i:s");

// istitleExist($banner, $banner->banner_title);

$query = checkCreate($banner);
returnSuccess($banner, "banner", $query);