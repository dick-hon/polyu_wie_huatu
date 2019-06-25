<?php
//fetch answer data from db
include("../../config.php");
mysqli_query($con,"set names utf8");
$q_id = $_POST['q_id'];
$user_answer = $_POST['user_answer'];
$isCorrect = $_POST['isCorrect'];

/*
$q_id = 2;
$user_answer = "A";
$isCorrect = 1;
*/
$sql_result = "INSERT INTO record (u_id, q_id, answer, correct) VALUES ('1', '$q_id', '$user_answer', '$isCorrect')";

mysqli_query($con, $sql_result);

mysqli_close($con);
?>