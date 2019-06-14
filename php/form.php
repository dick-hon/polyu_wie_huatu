<?php
 
 
$con=mysqli_connect("localhost","root","root","huatu"); 
if (!$con)
  {
  die('Could not connect: ' . mysqli_connect_error());
  }
 
 
mysqli_query($con,"set names utf8");
 
 
if (!empty($_POST['xingming'])&&!empty($_POST['xingbie'])&&!empty($_POST['aihao'])){
	$sql="INSERT INTO person (xingming, xingbie, aihao) VALUES ('$_POST[xingming]','$_POST[xingbie]','$_POST[aihao]')";
	
	
	$result = mysqli_query($con,$sql);
	if (!$result)
	  {  
		die('Error: ' . mysqli_connect_error());
	 }
 
}
 
 
 
 
  $sql1 = "SELECT * FROM person";
  $result1 = mysqli_query($con,$sql1);
  
 
  
?>
 
<!doctype html>
<html lang="zh-cn">
<head>
<meta charset="utf-8">
 
 
<title>表单</title>
</head>
 
<body style="margin:50px;">
 
<script language="JavaScript"> 
function myrefresh() 
{ 
window.location.reload(); 
} 
setTimeout('myrefresh()',10000); //指定1秒刷新一次 
</script> 
 
 <h1>Testing by Dick</h1>
 
<table style='text-align:left;' border='1'>
         <tr><th>id</th><th>名字</th><th>性别</th><th>爱好</th></tr>
<?php
     while ($bookInfo = mysqli_fetch_array($result1,MYSQLI_ASSOC)){ //返回查询结果到数组
			$xingming = $bookInfo["xingming"]; //将数据从数组取出
			$xingbie = $bookInfo["xingbie"];
			$aihao = $bookInfo["aihao"];
			$id = $bookInfo["id"];
              echo "<tr><td>{$id}</td><td>{$xingming}</td><td>{$xingbie}</td><td>{$aihao}</td></tr>";
     }
	 
//释放结果集
mysqli_free_result($result1);
 
mysqli_close($con);
?>
</table>
 
 
</body>
</html>