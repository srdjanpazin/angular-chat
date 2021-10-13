<?php
require 'cleardb_connect.php';

if (!isset($_POST['chat']) || !isset($_POST['from']) || !isset($_POST['msg'])) {
	http_response_code(400);
	header('Content-Type: text/plain; charset=UTF-8');
	echo "Undefined parameters\n";
	exit;
}

if (empty($_POST['msg'])) {
	http_response_code(400);
	header('Content-Type: text/plain; charset=UTF-8');
	echo 'Parameter \'msg\' cannot be an empty string';
	exit;
}

$chat =	$mysqli->real_escape_string($_POST['chat']);
$user = $mysqli->real_escape_string($_POST['from']);
$time = date('YmdHis');
$msg = $mysqli->real_escape_string($_POST['msg']);

$query = "INSERT INTO $chat (from_user, time, msg) VALUES
	('$user', '$time', '$msg')";

$result = $mysqli->query($query);
if (!$result) {
	http_response_code(500);
	header('Content-Type: text/plain; charset=UTF-8');
	echo 'Insert query failed'."\n";
	echo 'Query: '.$query;
	exit;
}

require 'pusher-connect.php';

$pusher->trigger("$chat", 'new-message', [
	'message' => $msg,
	'user' => $user,
	'time' => $time
]);

$mysqli->close();
?>