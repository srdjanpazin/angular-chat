<?php
/*
 * Returns an JSON object with contacts info and chat ids
 */

require 'cleardb_connect.php';

$user_id = $mysqli->real_escape_string($_GET['user_id']);
$user_contacts = $user_id . '_contacts';

$query = "SELECT users.id, users.fname, users.lname, users.profile_img,
	${user_contacts}.chat_id FROM $user_contacts JOIN users ON
	${user_contacts}.contact_id=users.id";
$result = $mysqli->query($query);

if (!$result) {
	http_response_code(500);
	header('Content-Type: text/plain; charset=UTF-8');
	echo "get-contacts-info.php: Query failed \"${query}\"";
	exit;
}

// ADD ERROR HANDLING CODE

// If the query returned a result set
if ($result->num_rows > 0) {
	header('Content-Type: application/json');
	$obj = array( "result" => $result->fetch_all(MYSQLI_NUM) );
	echo json_encode($obj);
}

$result->close();
$mysqli->close();
?>