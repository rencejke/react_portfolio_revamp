<?php
$conn = null;
$conn = checkDbConnection();
$Projects = new Projects($conn);
$error = [];
$returnData = [];

if (empty($_GET)) {
    $query = checkReadAll($Projects);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();