<?php
//fetch question_title from db
include("config.php");
mysqli_query($con,"set names utf8");
// $q_id = GET[]; //question # ? 

$sql_title = "SELECT q_id, cat_id, level_id, article_id, question_title, question_answer, last_updated FROM question WHERE q_id = '1'";
$sql_content = "SELECT question_content FROM question";

$result_title = mysqli_query($con, $sql_title); 
//$result_content = mysqli_query($con, $sql_content);

//for further primary development
//$count = "SELECT COUNT(*) FROM test_mc WHERE cat_id='1'";
//$count_result = mysqli_fetch_array(mysqli_query($con, $count));

//tutorial
//https://www.jb51.net/article/140477.htm


//title
$arr = array();
$counter = 1; // get value from .js
while ($row = mysqli_fetch_array($result_title)) {
    $count = count($row); //不能在循环语句中，由于每次删除 row数组长度都减小 
    for ($i = 0; $i < $count; $i++) {
        unset($row[$i]); //删除冗余数据 
    }
    $row['question_title'] = $counter.'.'.$row['question_title'];
    array_push($arr, $row);
    $counter++;
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);

//echo "<br/><br/><br/>";

/*
//content
$arr2 = array();
$counter = 0;
$output = "";   //to store the result_json tempilory
while ($row2 = mysqli_fetch_array($result_content)) {
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
*/

mysqli_close($con);
?>