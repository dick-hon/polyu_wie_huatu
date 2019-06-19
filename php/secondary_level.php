<?php
$con = mysqli_connect("localhost","root","root","huatu"); 
if (!$con) {
  die('Could not connect: ' . mysqli_connect_error());
}

mysqli_query($con,"set names utf8");
 
$sql = "SELECT * FROM person";
$result = mysqli_query($con,$sql); 

//tutorial
//https://www.jb51.net/article/140477.htm
$arr = array();
while ($row = mysqli_fetch_array($result)) {
    $count = count($row); //不能在循环语句中，由于每次删除 row数组长度都减小 
    for ($i = 0; $i < $count; $i++) {
        unset($row[$i]); //删除冗余数据 
    }
    array_push($arr, $row);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);


/*
$row = mysqli_fetch_array($result);
printf("%s", $row[0]);
printf("%s", $row[1]);
printf("%s", $row[2]);
printf("%s", $row[3]);
printf("%s", $row[4]);
printf("%s", $row[5]);
*/


/*
if($res = mysqli_fetch_array($result)) {
    echo "$res";
    $json = json_encode($res);
}
*/

mysqli_close($con);
?>