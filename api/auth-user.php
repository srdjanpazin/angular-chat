<?php
require 'cleardb_connect.php';

$username = $mysqli->real_escape_string($_POST['uname']);
$pwd = $mysqli->real_escape_string($_POST['pwd']);

if (!isset($username) || !isset($pwd)) {
	http_response_code(400);
	header('Content-Type: text/html');
	// Script has already printed notices
	exit;
}

$query = "SELECT id, fname, lname, profile_img FROM users WHERE id='$username'
	AND pwd='$pwd'";
$res = $mysqli->query($query);

if (!$res) {
	http_response_code(500);
	header('Content-Type: text/plain');
	echo 'auth-user.php: Query failed: '.$query;
	exit;
}

class ResponseObject {
	public $authenticated = false;
	public $user_data = null;
}
$response_obj = new ResponseObject();

if ($res->num_rows == 0) {
	header('Content-Type: application/json');
	echo json_encode($response_obj);
	exit;
}

$response_obj->authenticated = true;
$response_obj->user_data = (object) $res->fetch_assoc();
header('Contant-Type: application/json');
echo json_encode($response_obj);

$res->close();
$mysqli->close();
?>