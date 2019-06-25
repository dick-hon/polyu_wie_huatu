<?php
include("../../config.php");
mysqli_query($con,"set names utf8");

$sql_menu = "SELECT * FROM level";

$result_menu = mysqli_query($con, $sql_menu);
//tutorial
//https://www.jb51.net/article/140477.htm


//sql_menu
$arr = array();
while ($row = mysqli_fetch_array($result_menu)) {
    $count = count($row); //不能在循环语句中，由于每次删除 row数组长度都减小 
    for ($i = 0; $i < $count; $i++) {
        unset($row[$i]); //删除冗余数据 
    }
    array_push($arr, $row);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

mysqli_close($con);
?>