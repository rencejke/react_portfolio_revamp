<?php
$conn = null;
$conn = checkDbConnection();
$exp = new Exp($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($exp);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();