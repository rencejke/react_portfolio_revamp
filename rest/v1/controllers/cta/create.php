<?php
$conn = null;
$conn = checkDbConnection();
$cta = new Cta($conn);
if (array_key_exists("ctaid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$cta->cta_title = checkIndex($data, "cta_title");
$cta->cta_msg= checkIndex($data, "cta_msg");
$cta->cta_btn_title= checkIndex($data, "cta_btn_title");
$cta->cta_is_active = 1;
$cta->cta_created = date("Y-m-d H:i:s");
$cta->cta_datetime = date("Y-m-d H:i:s");

// istitleExist($cta, $cta->cta_title);

$query = checkCreate($cta);
returnSuccess($cta, "cta", $query);