<?php
$conn = null;
$conn = checkDbConnection();
$exp = new Exp($conn);
if (array_key_exists("expid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);

$exp->exp_image = checkIndex($data, "exp_image");
$exp->exp_image_animation = checkIndex($data, "exp_image_animation");
$exp->exp_is_active = 1;
$exp->exp_created = date("Y-m-d H:i:s");
$exp->exp_datetime = date("Y-m-d H:i:s");

// istitleExist($exp, $exp->exp_title);

$query = checkCreate($exp);
returnSuccess($exp, "exp", $query);