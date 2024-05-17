<?php
$conn = null;
$conn = checkDbConnection();
$exp = new Exp($conn);

$error = [];
$returnData = [];
if (array_key_exists("expid", $_GET)) {
    $exp->exp_aid = $_GET['expid'];
    checkId($exp->exp_aid);

    $query = checkDelete($exp);
    returnSuccess($exp, "exp", $query);
}

checkEndpoint();