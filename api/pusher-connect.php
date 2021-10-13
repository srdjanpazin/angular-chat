<?php
require './../vendor/autoload.php';

$options = array(
  'cluster' => 'eu',
  'useTLS' => true
);
$pusher = new Pusher\Pusher(
  'APP_KEY',
  'APP_SECRET',
  'APP_ID',
  $options
);
?>