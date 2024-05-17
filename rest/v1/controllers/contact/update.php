<?php
$conn = null;
$conn = checkDbConnection();
$contact = new contact($conn);
$error = [];
$returnData = [];
if (array_key_exists("contactid", $_GET)) {
    checkPayload($data);
    $contact->contact_aid = $_GET['contactid'];
    $contact->contact_name = checkIndex($data, "contact_name");
    $contact->contact_email = checkIndex($data, "contact_email");
    $contact->contact_subject= checkIndex($data, "contact_subject");
    $contact->contact_message = checkIndex($data, "contact_message");
    $contact->contact_datetime = date("Y-m-d H:i:s");
    
    checkId($contact->contact_aid);
    // $contact_name_old = checkIndex($data, "contact_name_old");
    // compareName($contact, $contact_name_old, $contact->contact_name);
    $query = checkUpdate($contact);
    returnSuccess($contact, "contact", $query);
}

checkEndpoint();