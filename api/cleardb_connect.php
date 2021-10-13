<?php
$url = parse_url(getenv('CLEARDB_DATABASE_URL'));

$server = $url['host'];
$username = $url['user'];
$password = $url['pass'];
$db = substr($url['path'], 1);

$mysqli = new mysqli($server, $username, $password, $db);

if ($mysqli->connect_errno) {
	http_response_code(500);
	header('Content-Type: text/plain; charset=UTF-8');
	printf("Connect failed: %s<br>\n", $mysqli->connect_error);
	exit;
}
?>