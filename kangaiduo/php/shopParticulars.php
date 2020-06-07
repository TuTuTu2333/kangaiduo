<?php
$id = $_REQUEST["id"];
$table = $_REQUEST["table"];

$database = mysqli_connect("127.0.0.1", "root", "", "kangaiduo");
$database->query("SET NAMES utf8");

if ($table == "druglistpage") {
   $sql = "SELECT * FROM druglistpage WHERE id='$id'";
}else if($table=="nonmedicine"){
   $sql = "SELECT * FROM nonmedicine  WHERE id='$id'";
}
$result = mysqli_query($database, $sql);

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);
