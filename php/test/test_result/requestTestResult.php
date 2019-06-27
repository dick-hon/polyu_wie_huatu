<?php
//fetch answer data from db
include("../../config.php");
mysqli_query($con,"set names utf8");

$user_id = $_POST['user_id'];

//TODO: GET VAULE FROM Personal info for appID

//for the original sql statement
// $sql = "SELECT * FROM record WHERE u_id = 1";

$sql = "SELECT record.q_id, record.answer, record.correct, question.article_id, question.question_title, question.question_answer FROM record INNER JOIN question ON record.q_id = question.q_id WHERE u_id = '$user_id'";

$sql_result = mysqli_query($con, $sql);

//tutorial
//https://www.jb51.net/article/140477.htm

$arr = array();
while ($row = mysqli_fetch_array($sql_result)) {
    $count = count($row); //不能在循环语句中，由于每次删除 row数组长度都减小 
    for ($i = 0; $i < $count; $i++) {
        unset($row[$i]); //删除冗余数据 
    }
    array_push($arr, $row);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

mysqli_close($con);
?>