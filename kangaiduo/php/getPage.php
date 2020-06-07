<?php
$database = mysqli_connect("127.0.0.1", "root", "", "kangaiduo");
$type = $_REQUEST["type"];

if ($type == 'nonMedicine') {
  $sql = "SELECT * FROM nonMedicine";
} elseif ($type == 'medicine' || $type == 'index') {
  $sql = "SELECT * FROM drugListPage";
}
$result = mysqli_query($database, $sql);
$count = mysqli_num_rows($result);

if ($type == 'nonMedicine' || $type == 'medicine') {

  echo json_encode($count, true);
} elseif ($type == 'index') {

  $size = ceil($count / 5);
  echo json_encode($size, true);
}
