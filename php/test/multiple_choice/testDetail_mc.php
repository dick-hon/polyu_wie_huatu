<?php
//fetch answer data from db
include("../../config.php");
mysqli_query($con,"set names utf8");
$q_id = $_GET["q_id"]; //question # ? 

//$question_answer_id = $_GET["q_id"];
//$student_answer = $_GET["s_ans"];
//$question_answer_id = 1;
//echo $student_answer;

//$sql_title = "SELECT q_id, cat_id, level_id, question_title, last_updated FROM question";
//$sql_content = "SELECT question_content FROM question WHERE q_id = '1'";
//$sql_answer = "SELECT question_answer FROM question WHERE q_id = '$question_answer_id'";

$sql_answer = "SELECT question_title, question_answer FROM question WHERE q_id = '$q_id'";


$result_answer = mysqli_query($con, $sql_answer);

//for further primary development
//$count = "SELECT COUNT(*) FROM test_mc WHERE cat_id='1'";
//$count_result = mysqli_fetch_array(mysqli_query($con, $count));

//tutorial
//https://www.jb51.net/article/140477.htm


//sql_answer
$arr = array();
while ($row = mysqli_fetch_array($result_answer)) {
    $count = count($row); //不能在循环语句中，由于每次删除 row数组长度都减小 
    for ($i = 0; $i < $count; $i++) {
        unset($row[$i]); //删除冗余数据 
    }
    /*
    if($row['question_answer'] == $student_answer)
        $row['question_answer'] = "correct";
    else
        $row['question_answer'] = "wrong";
    */
    
    array_push($arr, $row);
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

mysqli_close($con);
?>