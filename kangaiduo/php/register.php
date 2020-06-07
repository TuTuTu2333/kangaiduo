<?php
   $database=mysqli_connect("127.0.0.1","root","","kangaiduo");

//    if(!$database){
//     echo "数据库连接失败";
// }else{
//     echo "数据库连接成功";
// }

   $username=$_REQUEST["username"];
   $password=$_REQUEST["password"];
//    echo $username,$password;

   $sql1="SELECT * FROM userdata WHERE username='$username'";
   $result=mysqli_query($database,$sql1);

   if(mysqli_num_rows($result)==0){
       $sql2 = "insert into userdata (id,username,password) values (null,'$username','$password')";
       $result=mysqli_query($database,$sql2);
       $arr=array("status"=>"success","msg"=>"恭喜你，注册成功！");
       echo json_encode($arr);
   }else{
       echo '{"status":"erro","msg":"抱歉，该用户名已经被注册"}';
   }
?>