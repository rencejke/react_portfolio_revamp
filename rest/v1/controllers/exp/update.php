<?php
$conn = null;
$conn = checkDbConnection();
$exp = new Exp($conn);
$error = [];
$returnData = [];
if (array_key_exists("expid", $_GET)) {
    checkPayload($data);
    $exp->exp_aid = $_GET['expid'];
    $exp->exp_image = checkIndex($data, "exp_image");
    $exp->exp_image_animation = checkIndex($data, "exp_image_animation");
    $exp->exp_datetime = date("Y-m-d H:i:s");
    
    checkId($exp->exp_aid);
    // $exp_name_old = checkIndex($data, "exp_name_old");
    // compareName($exp, $exp_name_old, $exp->exp_name);
    $query = checkUpdate($exp);
    returnSuccess($exp, "exp", $query);
}

checkEndpoint();