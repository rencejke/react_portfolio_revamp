<?php
$conn = null;
$conn = checkDbConnection();
$contact = new contact($conn);
if (array_key_exists("contactid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$contact->contact_name = checkIndex($data, "contact_name");
$contact->contact_email = checkIndex($data, "contact_email");
$contact->contact_subject= checkIndex($data, "contact_subject");
$contact->contact_message = checkIndex($data, "contact_message");
$contact->contact_is_active = 1;
$contact->contact_created = date("Y-m-d H:i:s");
$contact->contact_datetime = date("Y-m-d H:i:s");

// istitleExist($contact, $contact->contact_title);

$query = checkCreate($contact);
returnSuccess($contact, "contact", $query);