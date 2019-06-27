<?php
//fetch student test record of mc from db
include("../../config.php");
mysqli_query($con,"set names utf8");

$user_id = $_POST['user_id'];

//TODO: GET VAULE FROM Personal info for appID

//for the original sql statement

// $sql = "SELECT record.q_id, record.answer, record.correct, question.article_id, question.question_title, question.question_answer FROM record INNER JOIN question ON record.q_id = question.q_id WHERE u_id = '$user_id'";

$sql = "SELECT question.question_content FROM question INNER JOIN record ON question.q_id = record.q_id WHERE u_id = '$user_id'";

$sql_result = mysqli_query($con, $sql);

//tutorial
//https://www.jb51.net/article/140477.htm

//content
$arr2 = array();
$counter = 0;
$output = "";   //to store the result_json tempilory
while ($row2 = mysqli_fetch_array($sql_result)) {
    $count2 = count($row2); //不能在循环语句中，由于每次删除 row数组长度都减小 
    for ($i = 0; $i < $count2; $i++) {
        unset($row2[$i]); //删除冗余数据 
    }
    // We add '[' in the first json element, ',' in the rest of json element.
    if($counter == 0){
        $result_json = "[".$row2['question_content'];
    }
    else{
        $result_json = ",".$row2['question_content'];
    }
    $counter++;    
    $output .= $result_json;
}
echo $output."]";

mysqli_close($con);
?>