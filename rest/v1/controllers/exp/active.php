<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Exp.php';

$conn = null;
$conn = checkDbConnection();

$exp = new Exp($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("expid", $_GET)) {

        checkPayload($data);
        $exp->exp_aid = $_GET['expid'];
        $exp->exp_is_active = trim($data["isActive"]);
        $exp->exp_datetime = date("Y-m-d H:i:s");
        checkId($exp->exp_aid);
        $query = checkActive($exp);
        http_response_code(200);
        returnSuccess($exp, "exp", $query);
    }
    checkEndpoint();
}

http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();