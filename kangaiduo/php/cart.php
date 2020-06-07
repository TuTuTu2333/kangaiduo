<?php

$database = mysqli_connect("127.0.0.1", "root", "", "kangaiduo");
$database->query("SET NAMES utf8");

$type = $_REQUEST["type"];
$user_name = $_REQUEST["user_name"];

//渲染购物车
if ($type == "get") {
    $sql = "SELECT table_name,goods_id FROM cart WHERE user_name='$user_name'";
    $result = mysqli_query($database, $sql);
    $arr = array();
    while ($row = mysqli_fetch_array($result)) {
        $table_name = $row['table_name'];
        $goods_id = $row['goods_id'];
        $res = mysqli_query($database, "SELECT * FROM $table_name WHERE id=$goods_id");
        $data = $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
        array_push($arr, $data);
    }
    echo json_encode($arr, true);
} else if ($type == "add") { //加入购物车功能
    $table = $_REQUEST["table"];
    $goods_id = $_REQUEST["goods_id"];
    $product_num = $_REQUEST["product_num"];

    $sql = "SELECT * FROM cart WHERE table_name='$table' AND goods_id=$goods_id AND user_name='$user_name'";
    $result = mysqli_query($database, $sql);

    if (mysqli_num_rows($result) == 0) {
        $sql = "INSERT INTO `cart` (`cart_id`,`table_name`,`goods_id`,`user_name`,`product_num`) VALUES (null,'$table',$goods_id,'$user_name',$product_num)";
    } else {
        $sql = "UPDATE `cart` SET `product_num`=`product_num`+$product_num WHERE table_name='$table' AND goods_id=$goods_id AND user_name='$user_name'";
    }
    $res = mysqli_query($database, $sql);
    echo json_encode(array("status" => "success"));
} else if ($type == "getCount") { //获取购物车中商品的数量
    $sql = "SELECT * FROM cart WHERE user_name='$user_name'";
    $result = mysqli_query($database, $sql);
    $data = mysqli_fetch_all(mysqli_query($database, $sql), MYSQLI_ASSOC);
    $total = 0;
    for ($i = 0; $i < count($data); $i++) {
        $total += $data[$i]["product_num"];
    }
    echo json_encode(array("status" => "success", "count" => $total), true);
} else if ($type == "delete") { //实现删除功能
    $goods_id = $_REQUEST["goods_id"];
    $sql = "DELETE FROM `cart` WHERE goods_id = $goods_id AND user_name = '$user_name'";
    $result = mysqli_query($database, $sql);
    echo json_encode(array("status" => "success"), true);
} else if ($type == "update") { //更新数量
    $goods_id = $_REQUEST["goods_id"];
    $count = $_REQUEST["count"];
    $plusSql = "UPDATE `cart` SET `product_num`= $count WHERE `goods_id`=$goods_id AND user_name=$user_name";
    mysqli_query($database, $plusSql);
    echo json_encode(array("status" => "success"), true);
} else if ($type == "newCount") {
    $goods_id = $_REQUEST["goods_id"];
    $sql = "SELECT product_num FROM cart WHERE goods_id=$goods_id AND user_name='$user_name'";
    $result = mysqli_query($database, $sql);
    while ($row = mysqli_fetch_array($result)) {
        $product_num = $row['product_num'];
        echo $product_num;
    }
}
