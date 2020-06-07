<?php
$database = mysqli_connect("127.0.0.1", "root", "", "kangaiduo");
$database->query("SET NAMES utf8");
// if($database){
//     echo "数据库连接成功";
// }else{
//     echo "数据库连接失败";
// }

$page = $_REQUEST["page"];
$type = $_REQUEST["type"];
$start = ($page - 1) * 20;
$indexStart = ($page - 1) * 5;
if ($type == 'nonMedicine') {
    $sql = "SELECT * FROM nonMedicine LIMIT $start,20";
} elseif ($type == 'medicine') {
    $sql = "SELECT * FROM drugListPage LIMIT $start,20";
} elseif ($type == 'index') {
    $sql = "SELECT * FROM drugListPage LIMIT $indexStart,5";
}

$result = mysqli_query($database, $sql);

// $json = '';
// while ($row = mysqli_fetch_assoc($result)) {
//    $json .= json_encode($row) . ',';
// }
// $json . substr(0, -1);
// echo '[' . $json . ']';

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($data, true);
