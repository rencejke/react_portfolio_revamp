<?php
$conn = null;
$conn = checkDbConnection();
$projects = new Projects($conn);
if (array_key_exists("projectsid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$projects->projects_num = checkIndex($data, "projects_num");
$projects->projects_title = checkIndex($data, "projects_title");
$projects->projects_image= checkIndex($data, "projects_image");
$projects->projects_description= checkIndex($data, "projects_description");
$projects->projects_btn_title = checkIndex($data, "projects_btn_title");
$projects->projects_animation = checkIndex($data, "projects_animation");
$projects->projects_is_active = 1;
$projects->projects_created = date("Y-m-d H:i:s");
$projects->projects_datetime = date("Y-m-d H:i:s");

// istitleExist($projects, $projects->projects_title);

$query = checkCreate($projects);
returnSuccess($projects, "projects", $query);