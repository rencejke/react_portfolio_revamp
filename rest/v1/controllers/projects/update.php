<?php
$conn = null;
$conn = checkDbConnection();
$projects = new Projects($conn);
$error = [];
$returnData = [];
if (array_key_exists("projectsid", $_GET)) {
    checkPayload($data);
    $projects->projects_aid = $_GET['projectsid'];
    $projects->projects_num = checkIndex($data, "projects_num");
    $projects->projects_title = checkIndex($data, "projects_title");
    $projects->projects_image= checkIndex($data, "projects_image");
    $projects->projects_description= checkIndex($data, "projects_description");
    $projects->projects_btn_title = checkIndex($data, "projects_btn_title");
    $projects->projects_animation = checkIndex($data, "projects_animation");
    $projects->projects_datetime = date("Y-m-d H:i:s");
    
    checkId($projects->projects_aid);
    // $projects_name_old = checkIndex($data, "projects_name_old");
    // compareName($projects, $projects_name_old, $projects->projects_name);
    $query = checkUpdate($projects);
    returnSuccess($projects, "projects", $query);
}

checkEndpoint();